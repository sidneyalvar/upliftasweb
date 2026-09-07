"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, PlusCircle } from "lucide-react";
import MagnifyImage from "@/components/products/MagnifyImage";

export default function StepModelSelector({ models, productName }) {
  const [active, setActive] = useState(models[0].steps);
  const current = models.find((m) => m.steps === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        {models.map((m) => (
          <button
            key={m.steps}
            onClick={() => setActive(m.steps)}
            aria-pressed={active === m.steps}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold border-2 transition-all duration-200 ${
              active === m.steps
                ? "bg-primary border-primary text-white shadow-md"
                : "border-black/10 text-ink-muted hover:border-primary hover:text-primary"
            }`}
          >
            {m.steps}-Step Model
          </button>
        ))}
      </div>

      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl bg-secondary/60 p-6 md:p-8 space-y-8"
          >
            <div className="grid md:grid-cols-2 gap-8">
              {current.modelImage && (
                <div>
                  <MagnifyImage
                    src={current.modelImage}
                    alt={`${productName} — ${current.steps}-step model`}
                  />
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4 content-start">
                {current.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex justify-between gap-4 border-b border-black/10 pb-3 text-sm"
                  >
                    <span className="text-ink-muted">{spec.label}</span>
                    <span className="font-semibold text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {(current.standardFeatures || current.optionalFeatures) && (
              <div className="grid sm:grid-cols-2 gap-8 border-t border-black/10 pt-6">
                {current.standardFeatures && (
                  <div>
                    <h4 className="font-bold text-sm mb-3 flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-primary" />
                      Standard on the {current.steps}-step model
                    </h4>
                    <ul className="space-y-2">
                      {current.standardFeatures.map((f) => (
                        <li
                          key={f}
                          className="text-sm text-ink-muted leading-relaxed border-l-2 border-primary/30 pl-3"
                        >
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {current.optionalFeatures && (
                  <div>
                    <h4 className="font-bold text-sm mb-3 flex items-center gap-2">
                      <PlusCircle size={16} className="text-ink-muted" />
                      Optional extras
                    </h4>
                    <ul className="space-y-2">
                      {current.optionalFeatures.map((f) => (
                        <li
                          key={f}
                          className="text-sm text-ink-muted leading-relaxed border-l-2 border-ink/10 pl-3"
                        >
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
