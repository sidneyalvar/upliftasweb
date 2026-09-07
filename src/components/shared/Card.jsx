"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ParallaxImage from "@/components/ui/ParallaxImage";

export function ProductCard({ product }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group rounded-2xl bg-white shadow-card hover:shadow-cardHover transition-shadow duration-300 overflow-hidden flex flex-col"
    >
      <div className="relative h-56 overflow-hidden">
        <ParallaxImage
          src={product.thumbnail}
          alt={product.name}
          className="absolute inset-0"
          imgClassName="transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <span className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-primary">
          {product.category}
        </span>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-2">{product.name}</h3>
        <p className="text-ink-muted text-sm leading-relaxed mb-5 flex-1">
          {product.shortDescription}
        </p>
        <Link
          href={`/products/${product.slug}`}
          className="group/btn relative inline-flex items-center gap-1.5 self-start rounded-full border border-primary pl-5 pr-4 py-2.5 text-sm font-semibold text-primary overflow-hidden isolate"
        >
          <span className="absolute inset-0 -z-10 origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover/btn:scale-x-100" />
          <span className="transition-colors duration-300 group-hover/btn:text-white">
            Learn more
          </span>
          <ArrowUpRight
            size={16}
            className="transition-all duration-300 group-hover/btn:text-white group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
          />
        </Link>
      </div>
    </motion.div>
  );
}

export function CaseCard({ item }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group rounded-2xl bg-white shadow-card hover:shadow-cardHover transition-shadow duration-300 overflow-hidden flex flex-col"
    >
      <div className="relative h-48 overflow-hidden">
        <ParallaxImage
          src={item.thumbnail}
          alt={item.title}
          className="absolute inset-0"
          imgClassName="transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <span className="eyebrow mb-2">{item.type}</span>
        <h3 className="text-lg font-bold mb-2 leading-snug">{item.title}</h3>
        <p className="text-ink-muted text-sm leading-relaxed mb-5 flex-1">
          {item.excerpt}
        </p>
        <div className="flex flex-wrap gap-4 text-sm font-semibold">
          <Link
            href={`/cases/${item.slug}`}
            className="text-primary inline-flex items-center gap-1 hover:gap-2 transition-all"
          >
            View case <ArrowUpRight size={14} />
          </Link>
          <Link
            href={`/products/${item.productSlug}`}
            className="text-ink-muted inline-flex items-center gap-1 hover:text-primary transition-colors"
          >
            View product <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export function NewsCard({ article }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group rounded-2xl bg-white shadow-card hover:shadow-cardHover transition-shadow duration-300 overflow-hidden flex flex-col"
    >
      <div className="relative h-44 overflow-hidden">
        <ParallaxImage
          src={article.thumbnail}
          alt={article.title}
          className="absolute inset-0"
          imgClassName="transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <time className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-2">
          {new Date(article.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <h3 className="text-lg font-bold mb-2 leading-snug">
          {article.title}
        </h3>
        <p className="text-ink-muted text-sm leading-relaxed mb-5 flex-1">
          {article.excerpt}
        </p>
        <Link
          href={`/news/${article.slug}`}
          className="inline-flex items-center gap-1 text-primary font-semibold text-sm hover:gap-2 transition-all"
        >
          Read more <ArrowUpRight size={14} />
        </Link>
      </div>
    </motion.div>
  );
}
