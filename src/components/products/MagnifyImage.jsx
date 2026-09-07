"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";
import PlaceholderBox from "@/components/ui/PlaceholderBox";

const LENS_SIZE = 160;
const ZOOM = 2.4;

export default function MagnifyImage({ src, alt }) {
  const containerRef = useRef(null);
  const [active, setActive] = useState(false);
  const [lens, setLens] = useState({ x: 0, y: 0, bgX: 0, bgY: 0 });
  const [failed, setFailed] = useState(false);

  // Reset the error flag if the parent swaps in a different src.
  useEffect(() => {
    setFailed(false);
  }, [src]);

  // A missing src, or one that actually fails to load (404/decode error),
  // falls back to the placeholder. Detected via the real <Image> onError
  // rather than guessing from the path string, so a genuine file under
  // /assets/ still renders instead of being hidden behind the placeholder.
  const isPlaceholder = !src || failed;

  function handleMove(e) {
    if (isPlaceholder) return;
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const bgX = (x / rect.width) * 100;
    const bgY = (y / rect.height) * 100;
    setLens({ x, y, bgX, bgY, w: rect.width, h: rect.height });
  }

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onMouseMove={handleMove}
      className={`relative rounded-2xl overflow-hidden bg-secondary/60 aspect-[4/3] select-none ${
        isPlaceholder ? "" : "cursor-zoom-in"
      }`}
    >
      {isPlaceholder ? (
        <PlaceholderBox
          label={`${alt} — magnify lens activates once a real photo is added`}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 600px"
          className="object-cover transition-transform duration-500"
          style={{ transform: active ? "scale(1.04)" : "scale(1)" }}
          onError={() => setFailed(true)}
        />
      )}

      {!isPlaceholder && !active && (
        <div className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-white/90 shadow-soft flex items-center justify-center pointer-events-none">
          <ZoomIn size={16} className="text-primary" />
        </div>
      )}

      {!isPlaceholder && active && lens.w && (
        <div
          className="hidden md:block absolute rounded-full border-4 border-white shadow-2xl pointer-events-none bg-no-repeat"
          style={{
            width: LENS_SIZE,
            height: LENS_SIZE,
            left: lens.x - LENS_SIZE / 2,
            top: lens.y - LENS_SIZE / 2,
            backgroundImage: `url(${src})`,
            backgroundSize: `${lens.w * ZOOM}px ${lens.h * ZOOM}px`,
            backgroundPosition: `${lens.bgX}% ${lens.bgY}%`,
          }}
        />
      )}

      <p className="sr-only">
        Hover or tap the image on desktop to see a magnified view of the
        model.
      </p>
    </div>
  );
}
