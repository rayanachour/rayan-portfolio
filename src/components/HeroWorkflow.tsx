import {
  ArrowDown,
  CalendarCheck2,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { heroWorkflow } from "@/data/content";

const icons = [MessageCircle, ShieldCheck, CalendarCheck2] as const;

export default function HeroWorkflow() {
  return (
    <aside
      aria-labelledby="hero-workflow-title"
      className="glass glass-strong relative w-full max-w-[31rem] overflow-hidden rounded-[2rem] p-6 sm:p-8"
    >
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative">
        <p className="eyebrow">{heroWorkflow.label}</p>
        <h2
          id="hero-workflow-title"
          className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl"
        >
          {heroWorkflow.title}
        </h2>

        <ol className="mt-7 space-y-3">
          {heroWorkflow.steps.map((step, index) => {
            const Icon = icons[index] ?? MessageCircle;
            return (
              <li key={step}>
                <div className="glass flex min-h-[4.75rem] items-center gap-4 rounded-2xl px-4 py-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary ring-1 ring-primary/25">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
                      Step {index + 1}
                    </span>
                    <p className="mt-1 text-sm leading-relaxed text-foreground/90 sm:text-base">
                      {step}
                    </p>
                  </div>
                </div>
                {index < heroWorkflow.steps.length - 1 && (
                  <div className="flex h-5 items-center pl-[2.05rem] text-primary/55">
                    <ArrowDown className="h-4 w-4" aria-hidden="true" />
                  </div>
                )}
              </li>
            );
          })}
        </ol>

        <p className="mt-5 border-t border-border/70 pt-4 text-xs leading-relaxed text-muted-foreground">
          {heroWorkflow.caption}
        </p>
      </div>
    </aside>
  );
}
