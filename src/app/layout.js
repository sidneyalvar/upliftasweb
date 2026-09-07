import "@/styles/globals.css";
import Header from "@/components/ui/Header";
import CurvedFooterTransition from "@/components/ui/CurvedFooterTransition";
import { siteConfig } from "@/lib/site-config";
import { organizationJsonLd } from "@/lib/seo";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default:
      "DuoStep Staircase Platform Lift & Accessibility Solutions | Upliftas",
    template: "%s | Upliftas",
  },
  description:
    "Upliftas engineers DuoStep, our staircase platform lift that folds an everyday staircase into a powered accessibility lift — plus Aeris Lift and Stairlift HDN, for homes, hospitals, schools, churches, and commercial buildings.",
  keywords: [
    "DuoStep",
    "DuoStep staircase lift",
    "staircase platform lift",
    "vertical lift platform",
    "wheelchair accessibility lift",
    "Aeris Lift",
    "Stairlift HDN",
    "Upliftas",
  ],
  robots: { index: true, follow: true },
  // Google's own guidance for the favicon shown in search results is a
  // square PNG/ICO/GIF/JPEG that's a multiple of 48x48px — SVG-only
  // favicons have a history of being picked up slowly or inconsistently
  // by Google's favicon crawler specifically (separate from how browsers
  // handle SVG favicons, which is fine). Listing the 48x48 PNG first and
  // the SVG second gives Google's crawler a format it's guaranteed to
  // read, while modern browsers still get the crisp vector version.
  icons: {
    icon: [
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title:
      "DuoStep Staircase Platform Lift & Accessibility Solutions | Upliftas",
    description:
      "DuoStep turns an everyday staircase into a powered accessibility lift in seconds — no permanent ramp, no lost floor space.",
    type: "website",
    siteName: siteConfig.name,
    url: baseUrl,
  },
  twitter: {
    card: "summary_large_image",
    title:
      "DuoStep Staircase Platform Lift & Accessibility Solutions | Upliftas",
    description:
      "DuoStep turns an everyday staircase into a powered accessibility lift in seconds — no permanent ramp, no lost floor space.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans bg-surface text-ink">
        {/* Organization structured data — helps Google associate the
            brand name, logo, and contact details with this domain. */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999] focus:rounded-full focus:bg-primary focus:text-white focus:px-5 focus:py-3 focus:text-sm focus:font-semibold"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="pt-20">{children}</main>
        <CurvedFooterTransition />
      </body>
    </html>
  );
}
