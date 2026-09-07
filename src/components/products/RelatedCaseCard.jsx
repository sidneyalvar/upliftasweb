"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ParallaxImage from "@/components/ui/ParallaxImage";

export default function RelatedCaseCard({ item }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group rounded-2xl bg-white shadow-card hover:shadow-cardHover transition-shadow duration-300 overflow-hidden"
    >
      <Link href={`/cases/${item.slug}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <ParallaxImage
            src={item.thumbnail}
            alt={item.title}
            className="absolute inset-0"
            imgClassName="transition-transform duration-700 ease-out group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-6 flex items-start justify-between gap-4">
          <div>
            <span className="eyebrow mb-1 block">{item.type}</span>
            <h3 className="font-bold leading-snug">{item.title}</h3>
          </div>
          <ArrowUpRight
            size={20}
            className="text-primary shrink-0 mt-1 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </div>
      </Link>
    </motion.div>
  );
}
