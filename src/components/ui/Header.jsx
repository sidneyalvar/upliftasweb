"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import HamburgerIcon from "@/components/ui/HamburgerIcon";
import { products } from "@/lib/data/products";
import { siteConfig } from "@/lib/site-config";

const navLinks = siteConfig.nav;

// Exact match for "/", otherwise treat any nested route as "under" this
// link too (e.g. /cases/some-case still lights up "Case Studies").
function isActivePath(pathname, href) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const firstRender = useRef(true);
  const productsActive = pathname.startsWith("/products");

  // `document` doesn't exist during SSR, so only portal the mobile menu
  // once mounted on the client.
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close the mobile menu whenever the route actually changes (covers back/
  // forward navigation and any programmatic navigation, not just link taps).
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll while the menu is open, and compensate for the
  // vanishing scrollbar so the page doesn't jump/shift horizontally.
  useEffect(() => {
    if (!mobileOpen) return;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const { overflow, paddingRight } = document.body.style;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [mobileOpen]);

  // Close on Escape for keyboard users.
  useEffect(() => {
    if (!mobileOpen) return;
    function onKeyDown(e) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  // If the viewport grows past the mobile breakpoint while the menu is
  // open (e.g. rotating a tablet, resizing a browser window), close it so
  // it can't get stuck open behind the desktop nav.
  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // All mobile menu rows in one flat list so entrance stagger delay is just
  // index * STEP — simple, direct, no variants-propagation magic involved.
  const mobileRows = [
    { type: "label", key: "label-products", text: "Products" },
    ...products.map((p) => ({
      type: "link",
      key: p.slug,
      href: `/products/${p.slug}`,
      label: p.name,
    })),
    ...navLinks.map((link) => ({
      type: "link",
      key: link.href,
      href: link.href,
      label: link.label,
    })),
  ];

  const STAGGER_STEP = 0.04;
  const STAGGER_BASE = 0.08;

  return (
    <>
    <header className="fixed top-0 inset-x-0 z-50 bg-white/70 backdrop-blur-xl border-b border-black/5">
      <Container className="flex items-center justify-between h-20">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Logo />
          <span className="text-xl font-bold tracking-tight">{siteConfig.shortName}</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          <div
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button
              className={`relative flex items-center gap-1 font-medium text-sm py-2 transition-colors ${
                productsActive ? "text-primary" : "text-ink hover:text-primary"
              }`}
              aria-current={productsActive ? "page" : undefined}
            >
              Products
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${
                  productsOpen ? "rotate-180" : ""
                }`}
              />
              {productsActive && (
                <motion.span
                  layoutId="nav-active-underline"
                  className="absolute left-0 right-6 -bottom-0.5 h-0.5 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
            <AnimatePresence>
              {productsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-72"
                >
                  <div className="bg-white rounded-xl shadow-cardHover border border-black/5 p-2">
                    {products.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/products/${p.slug}`}
                        className="flex flex-col gap-0.5 rounded-lg px-4 py-3 hover:bg-secondary transition-colors"
                      >
                        <span className="font-semibold text-sm">
                          {p.name}
                        </span>
                        <span className="text-xs text-ink-muted">
                          {p.tagline}
                        </span>
                      </Link>
                    ))}
                    <Link
                      href="/products"
                      className="block rounded-lg px-4 py-2.5 text-sm font-semibold text-primary hover:bg-secondary transition-colors"
                    >
                      View all products →
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks.map((link) => {
            const active = isActivePath(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative font-medium text-sm py-2 transition-colors ${
                  active ? "text-primary" : "text-ink hover:text-primary"
                }`}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-active-underline"
                    className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button href="/contact" variant="primary">
            Contact us
          </Button>
        </div>

        <button
          className="lg:hidden p-2 relative z-50"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          <HamburgerIcon open={mobileOpen} />
        </button>
      </Container>
    </header>

    {mounted &&
      createPortal(
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              key="mobile-menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed inset-x-0 top-20 bottom-0 z-[999] bg-white lg:hidden"
            >
              <motion.div
                initial={{ y: -24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -16, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="h-full overflow-y-auto"
              >
                <Container className="flex flex-col gap-1 pt-6 pb-10">
                  {mobileRows.map((row, i) => {
                    const delay = STAGGER_BASE + i * STAGGER_STEP;

                    if (row.type === "label") {
                      return (
                        <motion.span
                          key={row.key}
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35, delay, ease: "easeOut" }}
                          className="text-xs font-semibold uppercase tracking-widest text-ink-muted mb-2"
                        >
                          {row.text}
                        </motion.span>
                      );
                    }

                    return (
                      <motion.div
                        key={row.key}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay, ease: "easeOut" }}
                      >
                        <Link
                          href={row.href}
                          onClick={() => setMobileOpen(false)}
                          aria-current={isActivePath(pathname, row.href) ? "page" : undefined}
                          className={`flex items-center gap-2 py-3 text-lg font-semibold border-b border-black/5 transition-colors ${
                            isActivePath(pathname, row.href)
                              ? "text-primary"
                              : "text-ink hover:text-primary"
                          }`}
                        >
                          {isActivePath(pathname, row.href) && (
                            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          )}
                          {row.label}
                        </Link>
                      </motion.div>
                    );
                  })}

                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.35,
                      delay: STAGGER_BASE + mobileRows.length * STAGGER_STEP,
                      ease: "easeOut",
                    }}
                    className="mt-6"
                  >
                    <Button
                      href="/contact"
                      variant="primary"
                      className="w-full"
                      onClick={() => setMobileOpen(false)}
                    >
                      Contact us
                    </Button>
                  </motion.div>
                </Container>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
