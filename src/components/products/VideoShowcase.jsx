"use client";

import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { FadeUp } from "@/components/shared/MotionWrapper";
import PlaceholderBox from "@/components/ui/PlaceholderBox";

/**
 * Autoplaying, looping product demo video. Playback is tied to scroll
 * position via IntersectionObserver (through framer-motion's useInView):
 * the moment ~35% of the video enters the viewport it starts playing, and
 * it pauses again if the user scrolls away — so it behaves like a muted,
 * looping showreel rather than something the visitor has to click to start.
 *
 * Autoplay is muted by default (required by every major browser's autoplay
 * policy); a small toggle lets the visitor turn sound on.
 */
export default function VideoShowcase({ video, poster, title }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.35, once: false });
  const [missing, setMissing] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || missing) return;
    if (isInView) {
      const playPromise = el.play();
      if (playPromise) playPromise.catch(() => setMissing(true));
    } else {
      el.pause();
    }
  }, [isInView, missing]);

  if (!video) return null;

  return (
    <FadeUp>
      <div
        ref={containerRef}
        className="relative rounded-3xl overflow-hidden bg-ink h-[240px] sm:h-[320px] md:h-[420px] lg:h-[460px]"
      >
        {missing ? (
          <PlaceholderBox
            label={`${title} demo video — file not found at public${video}`}
          />
        ) : (
          <video
            ref={videoRef}
            poster={poster}
            className="w-full h-full object-cover"
            loop
            muted={muted}
            playsInline
            preload="metadata"
            aria-label={`${title} demo video`}
            onError={() => setMissing(true)}
          >
            <source src={video} type="video/mp4" />
          </video>
        )}

        {!missing && (
          <button
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? "Unmute video" : "Mute video"}
            aria-pressed={!muted}
            className="absolute bottom-4 right-4 w-11 h-11 rounded-full bg-white/90 hover:bg-white shadow-xl flex items-center justify-center transition-colors"
          >
            {muted ? (
              <VolumeX size={18} className="text-primary" />
            ) : (
              <Volume2 size={18} className="text-primary" />
            )}
          </button>
        )}
      </div>
    </FadeUp>
  );
}
