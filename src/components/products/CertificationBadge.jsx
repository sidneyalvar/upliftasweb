"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";

/**
 * A single certification badge image (ISO 9001, CE / EU Machine Directive,
 * etc). Falls back to a neutral icon tile — rather than the site's usual
 * bright yellow "add an image" placeholder — if the badge file is missing,
 * since a broken-looking yellow box next to a trust/compliance claim would
 * undercut the exact thing this section exists to convey.
 */
export default function CertificationBadge({ src, alt, size = 96 }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  const isPlaceholder = !src || failed;

  return (
    <div
      className="relative shrink-0 rounded-2xl bg-white shadow-card flex items-center justify-center overflow-hidden"
      style={{ width: size, height: size }}
    >
      {isPlaceholder ? (
        <div className="flex flex-col items-center justify-center gap-1 text-ink-muted/60 px-2 text-center">
          <ShieldCheck size={28} strokeWidth={1.5} />
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={`${size}px`}
          className="object-contain p-3"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
