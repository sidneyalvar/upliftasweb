import { NextResponse } from "next/server";
import { products } from "@/lib/data/products";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, phone, product, city, zip, country, inquiryType, message } = body || {};

  // Mirrors the `required` attributes on every field in ContactForm — the
  // HTML attribute only stops a normal browser submission, so the same
  // check is enforced again here for anything hitting the API directly.
  if (
    !name ||
    !email ||
    !phone ||
    !product ||
    !city ||
    !zip ||
    !country ||
    !inquiryType ||
    !message
  ) {
    return NextResponse.json(
      { error: "All fields are required." },
      { status: 400 }
    );
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (typeof email !== "string" || !emailPattern.test(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 }
    );
  }

  const MAX_LENGTHS = {
    name: 200,
    phone: 40,
    product: 100,
    city: 100,
    zip: 20,
    country: 100,
    inquiryType: 100,
    message: 5000,
  };
  if (
    String(name).length > MAX_LENGTHS.name ||
    String(message).length > MAX_LENGTHS.message ||
    (phone && String(phone).length > MAX_LENGTHS.phone) ||
    (product && String(product).length > MAX_LENGTHS.product) ||
    (city && String(city).length > MAX_LENGTHS.city) ||
    (zip && String(zip).length > MAX_LENGTHS.zip) ||
    (country && String(country).length > MAX_LENGTHS.country) ||
    (inquiryType && String(inquiryType).length > MAX_LENGTHS.inquiryType)
  ) {
    return NextResponse.json(
      { error: "One of the fields is too long." },
      { status: 400 }
    );
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    // Not configured yet — don't fail the whole submission (EmailJS may still
    // succeed client-side), just report that Telegram delivery was skipped.
    return NextResponse.json(
      {
        skipped: true,
        message:
          "Telegram is not configured yet. Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in your environment.",
      },
      { status: 200 }
    );
  }

  // Telegram's "HTML" parse_mode treats <, >, and & as markup. Without
  // escaping, a message containing any of those characters would either
  // fail to send (400 from Telegram) or render mangled — so escape all
  // user-supplied fields before building the message.
  const escapeHtml = (value) =>
    String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  const productName =
    product && product !== "general"
      ? products.find((p) => p.slug === product)?.name || product
      : "General inquiry / not sure yet";

  const location = [city, zip, country].filter(Boolean).join(", ");

  const text = [
    "📩 New inquiry from the website",
    `Name: ${escapeHtml(name)}`,
    `Email: ${escapeHtml(email)}`,
    phone ? `Phone: ${escapeHtml(phone)}` : null,
    productName ? `Product: ${escapeHtml(productName)}` : null,
    location ? `Location: ${escapeHtml(location)}` : null,
    inquiryType ? `Interested in: ${escapeHtml(inquiryType)}` : null,
    "",
    escapeHtml(message),
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
        }),
      }
    );

    const data = await res.json();

    if (!res.ok || !data.ok) {
      return NextResponse.json(
        { error: data.description || "Telegram delivery failed." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Could not reach Telegram." },
      { status: 502 }
    );
  }
}
