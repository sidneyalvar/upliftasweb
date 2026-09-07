import { siteConfig } from "@/lib/site-config";

const DEFAULT_IMAGE = "/assets/images/products/aeris-lift-gallery-1.WebP";

// Same env-var-aware base URL used in layout.js, robots.js, and sitemap.js.
// Without this, canonical/OG/JSON-LD URLs on every page would hard-code
// siteConfig.url ("https://upliftas.com") regardless of what
// NEXT_PUBLIC_SITE_URL is actually set to on the deployment — so if the
// live site is on a different domain, Google sees canonical tags pointing
// at a domain it isn't crawling, which actively works against indexing.
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;

/**
 * Builds a full Next.js `metadata` object (title, description, canonical,
 * Open Graph, Twitter card) from a small set of inputs, so every page gets
 * consistent, complete metadata instead of a bare title/description that
 * skips canonical URLs and social previews.
 *
 * `path` should start with "/" (or be "" for the homepage). `image` should
 * be an absolute-from-root path under /assets — resolved against
 * BASE_URL for the OG/Twitter tags, which need a full URL.
 */
export function buildMetadata({ title, description, path = "", image, keywords }) {
  const url = `${BASE_URL}${path}`;
  const ogImage = `${BASE_URL}${image || DEFAULT_IMAGE}`;

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

/**
 * Organization JSON-LD — rendered once, site-wide, in the root layout.
 * Helps Google associate the brand name/logo/contact details with the
 * domain in Knowledge Panel-style results.
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: BASE_URL,
    // Google's Organization/Knowledge Panel logo guidance recommends a
    // real raster image (PNG/JPG) rather than SVG for reliable pickup —
    // this is a plain 512x512 PNG rendered from the same brand mark used
    // for the site favicon (src/app/icon.svg), not a separate design.
    logo: `${BASE_URL}/assets/images/brand/logo-512.png`,
    description: siteConfig.description,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.contact.phoneHref,
        contactType: "customer service",
        email: siteConfig.contact.email,
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address,
    },
  };
}

/**
 * Product JSON-LD — deliberately does NOT use "@type": "Product".
 *
 * Google requires a Product entity to carry at least one of `offers`,
 * `review`, or `aggregateRating" before it's eligible for the Product
 * rich-result treatment — and will flag pages that use the Product type
 * without one as a "critical issue" in Search Console (this is exactly the
 * DuoStep error). Upliftas doesn't publish per-unit pricing (the product
 * pages themselves say "Built to a standard, not a price point") and has
 * no genuine, verifiable per-product review/rating data — the testimonials
 * in /lib/data/testimonials.js are placeholder sample content from this
 * build, not real collected reviews. Filling in a fabricated price or a
 * fabricated rating just to satisfy the check would misrepresent the
 * product to Google and risks a manual action for inaccurate structured
 * data — worse for search visibility than not having the rich result at
 * all, and it wouldn't be true.
 *
 * So: this uses the more general "Thing"-level structured data Google
 * doesn't hold to the Product rich-result requirements, and pages get a
 * BreadcrumbList instead (see `breadcrumbJsonLd`), which is unaffected by
 * this rule and still gives Google useful hierarchy/navigation context.
 * If genuine pricing or a real review/rating source (e.g. verified Google
 * reviews) is added later, this can switch back to "@type": "Product"
 * with an honest `offers` or `aggregateRating` block.
 */
export function productJsonLd(product) {
  return {
    "@context": "https://schema.org",
    "@type": "Thing",
    name: `${product.name} ${product.modelVersion}`,
    description: product.shortDescription,
    image: `${BASE_URL}${product.heroImage}`,
    url: `${BASE_URL}/products/${product.slug}`,
    identifier: product.sku,
    additionalProperty: [
      { "@type": "PropertyValue", name: "SKU", value: product.sku },
      { "@type": "PropertyValue", name: "Model", value: product.modelVersion },
      { "@type": "PropertyValue", name: "Category", value: product.category },
      { "@type": "PropertyValue", name: "Brand", value: siteConfig.name },
    ],
  };
}

/**
 * BreadcrumbList JSON-LD — the trail Google shows in place of a bare URL
 * under a search result (Home > Products > DuoStep). `trail` is an
 * ordered array of { name, path } from the homepage down to the current
 * page; `path` should start with "/" (home's path is "").
 */
export function breadcrumbJsonLd(trail) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}${item.path}`,
    })),
  };
}

/**
 * NewsArticle JSON-LD — rendered on each /news/[slug] page. Gives Google
 * the headline/image/publish date independent of the rendered HTML, which
 * is what backs eligibility for Google News / Discover / "Top stories"
 * style placements (regular indexing works without this, but this is what
 * unlocks those specific surfaces).
 */
export function articleJsonLd(article) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    image: [`${BASE_URL}${article.thumbnail}`],
    datePublished: article.date,
    dateModified: article.date,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/assets/images/brand/logo-512.png`,
        width: 512,
        height: 512,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/news/${article.slug}`,
    },
  };
}
