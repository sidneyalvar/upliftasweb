"use client";

import { motion } from "framer-motion";
import ParallaxImage from "@/components/ui/ParallaxImage";

export default function ProductGallery({ images, productName }) {
  if (!images || images.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-4 md:gap-5">
      {images.slice(0, 4).map((src, i) => (
        <motion.div
          key={src + i}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className={`${
            i === 0 ? "col-span-2 h-64 md:h-80" : "h-40 md:h-52"
          }`}
        >
          <ParallaxImage
            src={src}
            alt={`${productName} — view ${i + 1}`}
            className="rounded-2xl overflow-hidden group"
            imgClassName="transition-transform duration-700 ease-out group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, 400px"
            range={6}
          />
        </motion.div>
      ))}
    </div>
  );
}
