export default function Logo({ className = "w-9 h-9", markClassName = "w-6 h-6" }) {
  return (
    <div
      className={`${className} rounded-lg bg-primary flex items-center justify-center shrink-0`}
    >
      <svg
        viewBox="0 0 48 48"
        className={markClassName}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Two ascending staircases meeting at an apex — a lift/stair
            silhouette that reads as the letter "A" */}
        <path
          d="M7 40 L7 33 L14 33 L14 26 L21 26 L21 19 L24 13 L27 19 L27 26 L34 26 L34 33 L41 33 L41 40"
          stroke="white"
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.5 29 H31.5"
          stroke="white"
          strokeWidth="3.4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
