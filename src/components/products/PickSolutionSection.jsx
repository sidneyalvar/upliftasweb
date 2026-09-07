"use client";

import { Sliders, FileText, Ruler, Wrench, ShieldCheck } from "lucide-react";
import { FadeUp, StaggerGroup, StaggerItem } from "@/components/shared/MotionWrapper";
import Magnetic from "@/components/ui/Magnetic";
import Button from "@/components/ui/Button";

const steps = [
  {
    icon: Sliders,
    title: "Configure your solution",
    detail: "Tailor your solution to fit your needs.",
  },
  {
    icon: FileText,
    title: "Receive offer",
    detail: "We'll send a full overview with drawings, price, and delivery time.",
  },
  {
    icon: Ruler,
    title: "Prepare location",
    detail: "We advise you and your contractors on preparations.",
  },
  {
    icon: Wrench,
    title: "Installation",
    detail: "We install your solution as agreed.",
  },
];

export default function PickSolutionSection() {
  return (
    <div>
      <FadeUp className="max-w-2xl mb-14">
        <span className="eyebrow mb-3 block">Easy to become a customer</span>
        <h2 className="heading-lg mb-4">Let us guide you</h2>
        <p className="text-ink-muted text-lg leading-relaxed">
          Explore solutions on our website, or let our team walk you through
          it in four simple steps.
        </p>
      </FadeUp>

      <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {steps.map((step, i) => (
          <StaggerItem key={step.title}>
            <div
              tabIndex={0}
              className="group relative h-full rounded-2xl border border-ink/10 bg-white p-7 outline-none transition-all duration-300 hover:shadow-cardHover hover:-translate-y-1 focus-visible:shadow-cardHover"
            >
              <span className="absolute top-6 right-7 text-xs font-semibold text-ink-muted/50">
                0{i + 1}
              </span>
              <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-primary">
                <step.icon
                  size={26}
                  strokeWidth={1.75}
                  className="text-primary transition-colors duration-300 group-hover:text-white"
                />
              </div>
              <h3 className="font-bold text-lg mb-2 leading-snug">
                {step.title}
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed opacity-70 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300">
                {step.detail}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <FadeUp>
        <div className="rounded-2xl bg-secondary/60 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-soft">
              <ShieldCheck size={22} strokeWidth={1.75} className="text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Service</h3>
              <p className="text-ink-muted text-sm max-w-md leading-relaxed">
                A service agreement ensures maintenance and reliable operation.
              </p>
            </div>
          </div>
          <Magnetic>
            <Button href="/contact" variant="primary" className="shrink-0">
              Get a Quote!
            </Button>
          </Magnetic>
        </div>
      </FadeUp>
    </div>
  );
}
