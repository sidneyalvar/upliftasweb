import Link from "next/link";
import Image from "next/image";
import { Facebook, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { products } from "@/lib/data/products";
import { siteConfig } from "@/lib/site-config";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0a1f33] text-white/80">
      <Container className="py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Logo />
              <span className="text-xl font-bold text-white">{siteConfig.shortName}</span>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              {siteConfig.description}
            </p>
            <div className="flex items-center gap-3">
              <SocialIcon href={siteConfig.social.facebook} icon={Facebook} label="Facebook" />
              <SocialIcon href={siteConfig.social.linkedin} icon={Linkedin} label="LinkedIn" />
              <SocialIcon href={siteConfig.social.youtube} icon={Youtube} label="YouTube" />
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Products</h4>
            <ul className="space-y-3 text-sm">
              {products.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/products/${p.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/cases" className="hover:text-white transition-colors">
                  Case studies
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-white transition-colors">
                  News
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  All products
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span>{siteConfig.contact.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="shrink-0" />
                <span>
                  <a href={`tel:${siteConfig.contact.phoneHref}`} className="hover:text-white transition-colors">
                    {siteConfig.contact.phone}
                  </a>
                  {" / "}
                  <a href={`tel:${siteConfig.contact.phone2Href}`} className="hover:text-white transition-colors">
                    {siteConfig.contact.phone2}
                  </a>
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="shrink-0" />
                <span>{siteConfig.contact.email}</span>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div className="flex items-center gap-3">
            <Image
              src="/assets/images/certifications/ada-compliant-badge.png"
              alt="This website is ADA compliant"
              width={36}
              height={36}
              className="rounded-full shrink-0"
            />
            <span>© {year} {siteConfig.name}. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of use
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}

function SocialIcon({ href, icon: Icon, label }) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
    >
      <Icon size={16} />
    </Link>
  );
}
