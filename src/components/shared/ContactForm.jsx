"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";
import { products } from "@/lib/data/products";

const inquiryTypes = [
  "Residential installation",
  "Commercial / public building",
  "Hospital or care facility",
  "School or church",
  "Service agreement",
  "Other",
];

// A real (non-empty) value, not "" — a `required` <select> treats an
// empty-string option as "nothing chosen", which would make this default
// option impossible to submit even though it's a valid answer.
const GENERAL_INQUIRY = "general";

const productOptions = [
  { slug: GENERAL_INQUIRY, name: "General inquiry / not sure yet" },
  ...products.map((p) => ({ slug: p.slug, name: p.name })),
];

const initialState = {
  name: "",
  email: "",
  phone: "",
  product: GENERAL_INQUIRY,
  city: "",
  zip: "",
  country: "",
  inquiryType: inquiryTypes[0],
  message: "",
};

export default function ContactForm() {
  const [values, setValues] = useState(initialState);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMessage, setErrorMessage] = useState("");
  const [preselectedProduct, setPreselectedProduct] = useState(null);
  const searchParams = useSearchParams();

  // A visitor arriving via "Continue to contact form" on a product page
  // brings that product along as ?product=<slug> — pre-select it here and
  // surface a small confirmation so it's unmistakable which product the
  // form is about, per the brief ("clearly selected in the product list").
  useEffect(() => {
    const slug = searchParams.get("product");
    if (!slug) return;
    const match = products.find((p) => p.slug === slug);
    if (match) {
      setValues((v) => ({ ...v, product: match.slug }));
      setPreselectedProduct(match);
    }
  }, [searchParams]);

  function update(field) {
    return (e) => setValues((v) => ({ ...v, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    const results = await Promise.allSettled([
      // 1. Email via EmailJS (client-side, no server secret needed)
      (async () => {
        if (!serviceId || !templateId || !publicKey) {
          throw new Error("EmailJS is not configured yet.");
        }
        const emailjs = (await import("@emailjs/browser")).default;
        return emailjs.send(
          serviceId,
          templateId,
          {
            from_name: values.name,
            reply_to: values.email,
            phone: values.phone,
            product:
              productOptions.find((p) => p.slug === values.product)?.name ||
              "General inquiry",
            city: values.city,
            zip: values.zip,
            country: values.country,
            inquiry_type: values.inquiryType,
            message: values.message,
          },
          { publicKey }
        );
      })(),
      // 2. Telegram via our own API route (keeps the bot token server-side)
      fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }).then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || "Telegram delivery failed.");
        return data;
      }),
    ]);

    const [emailResult, telegramResult] = results;
    const emailOk = emailResult.status === "fulfilled";
    const telegramOk = telegramResult.status === "fulfilled";

    if (emailOk || telegramOk) {
      setStatus("success");
      setValues(initialState);
      setPreselectedProduct(null);
    } else {
      setStatus("error");
      setErrorMessage(
        "We couldn't send your message automatically. Please email or call us directly — details are on the right."
      );
    }
  }

  return (
    <div className="rounded-3xl bg-white shadow-card p-6 md:p-10">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center text-center py-10"
          >
            <CheckCircle2 size={44} className="text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Message sent</h3>
            <p className="text-ink-muted max-w-sm">
              Thank you — a member of our team will be in touch shortly to
              discuss your solution.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-6 text-sm font-semibold text-primary hover:underline"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Full name" htmlFor="name">
                <input
                  id="name"
                  required
                  value={values.name}
                  onChange={update("name")}
                  placeholder="Jane Doe"
                  className="input"
                />
              </Field>
              <Field label="Email" htmlFor="email">
                <input
                  id="email"
                  type="email"
                  required
                  value={values.email}
                  onChange={update("email")}
                  placeholder="jane@example.com"
                  className="input"
                />
              </Field>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Phone" htmlFor="phone">
                <input
                  id="phone"
                  type="tel"
                  required
                  value={values.phone}
                  onChange={update("phone")}
                  placeholder="+1 (555) 000-0000"
                  className="input"
                />
              </Field>
              <Field label="Which product?" htmlFor="product">
                <select
                  id="product"
                  required
                  value={values.product}
                  onChange={update("product")}
                  className={`input ${
                    preselectedProduct
                      ? "border-primary ring-2 ring-primary/20"
                      : ""
                  }`}
                >
                  {productOptions.map((p) => (
                    <option key={p.slug || "general"} value={p.slug}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            {preselectedProduct && (
              <div className="flex items-center gap-2 text-sm font-semibold text-primary bg-secondary rounded-xl px-4 py-3">
                <CheckCircle2 size={16} className="shrink-0" />
                <span>
                  Selected for your inquiry: {preselectedProduct.name}
                </span>
              </div>
            )}

            <div className="grid sm:grid-cols-3 gap-5">
              <Field label="City" htmlFor="city">
                <input
                  id="city"
                  required
                  value={values.city}
                  onChange={update("city")}
                  placeholder="Boston"
                  className="input"
                />
              </Field>
              <Field label="ZIP / Postal code" htmlFor="zip">
                <input
                  id="zip"
                  required
                  value={values.zip}
                  onChange={update("zip")}
                  placeholder="02110"
                  className="input"
                />
              </Field>
              <Field label="Country" htmlFor="country">
                <input
                  id="country"
                  required
                  value={values.country}
                  onChange={update("country")}
                  placeholder="United States"
                  className="input"
                />
              </Field>
            </div>

            <Field label="I'm inquiring about" htmlFor="inquiryType">
              <select
                id="inquiryType"
                required
                value={values.inquiryType}
                onChange={update("inquiryType")}
                className="input"
              >
                {inquiryTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="How can we help?" htmlFor="message">
              <textarea
                id="message"
                required
                rows={4}
                value={values.message}
                onChange={update("message")}
                placeholder="Tell us a little about the space and who the solution is for..."
                className="input resize-none"
              />
            </Field>

            {status === "error" && (
              <div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">
                <AlertTriangle size={18} className="shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <p className="text-xs text-ink-muted">
              <span className="text-red-500">*</span> All fields are
              required.
            </p>

            <Magnetic>
              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-primary w-full sm:w-auto disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send inquiry"
                )}
              </button>
            </Magnetic>
          </motion.form>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .input {
          width: 100%;
          border: 1px solid rgba(21, 22, 26, 0.12);
          background: #fff;
          border-radius: 0.9rem;
          padding: 0.75rem 1rem;
          font-size: 0.95rem;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .input:focus {
          outline: none;
          border-color: #2954e5;
          box-shadow: 0 0 0 3px rgba(41, 84, 229, 0.12);
        }
      `}</style>
    </div>
  );
}

function Field({ label, htmlFor, required = true, children }) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="block text-xs font-semibold uppercase tracking-wide text-ink-muted mb-2">
        {label}
        {required && (
          <span className="text-red-500 ml-0.5" aria-hidden="true">
            *
          </span>
        )}
      </span>
      {children}
    </label>
  );
}
