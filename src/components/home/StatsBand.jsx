"use client";

import { useRef, useEffect, useState } from "react";
import { useInView, motion, animate } from "framer-motion";
import { CalendarClock, Building2, ArrowUpCircle, HeartHandshake } from "lucide-react";

const stats = [
  {
    icon: CalendarClock,
    value: 12,
    suffix: "+",
    label: "Years designing mobility equipment",
  },
  {
    icon: Building2,
    value: 480,
    suffix: "+",
    label: "Facilities equipped worldwide",
  },
  {
    icon: ArrowUpCircle,
    value: 25000,
    suffix: "+",
    label: "Safe lifts performed monthly",
  },
  {
    icon: HeartHandshake,
    value: 98,
    suffix: "%",
    label: "Customer satisfaction rating",
  },
];

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, value]);

  return (
    <span
      ref={ref}
      className="block text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight tabular-nums"
    >
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function StatsBand() {
  return (
    <div className="rounded-3xl bg-primary px-6 py-10 sm:px-10 sm:py-14 md:px-14 md:py-16">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="flex flex-col items-start gap-3 sm:gap-4 border-t border-white/15 pt-5 sm:pt-6"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/15 flex items-center justify-center">
              <stat.icon size={20} strokeWidth={1.75} className="text-white" />
            </div>
            <div>
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="text-white/75 text-xs sm:text-sm mt-2 leading-snug max-w-[170px]">
                {stat.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
