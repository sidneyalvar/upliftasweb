import { ImagePlus } from "lucide-react";

/**
 * A bright, unmistakable "put your image here" placeholder. Used anywhere
 * a data file points at a local /assets/images/... path that doesn't exist
 * yet, so it's obvious during development which images still need to be
 * swapped in.
 */
export default function PlaceholderBox({ label, className = "" }) {
  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center gap-2 bg-yellow-400 border-2 border-dashed border-yellow-600/60 ${className}`}
    >
      <ImagePlus size={26} strokeWidth={1.5} className="text-yellow-900/80" />
      <span className="text-[11px] font-semibold text-yellow-900/80 text-center px-4 leading-snug max-w-[220px]">
        {label}
      </span>
    </div>
  );
}
