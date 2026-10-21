import { ArrowDown, ArrowRight } from "lucide-react";
import { automationFlow } from "@/data/content";

export default function AutomationFlow() {
  return (
    <div className="mt-20">
      <div className="max-w-2xl">
        <p className="eyebrow">Example automation</p>
        <h3 className="display mt-5 text-3xl sm:text-4xl xl:text-5xl">
          {automationFlow.heading}
        </h3>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {automationFlow.intro}
        </p>
      </div>

      <ol className="relative mt-10 grid gap-3 lg:grid-cols-4">
        {automationFlow.steps.map((item, index) => (
          <li key={item.step} className="relative flex lg:block">
            <article className="glass flex w-full gap-4 rounded-3xl p-6 lg:min-h-[17rem] lg:flex-col">
              <span className="display text-gradient shrink-0 text-4xl lg:text-5xl">
                {item.step}
              </span>
              <div className="lg:mt-auto">
                <h4 className="font-serif text-2xl tracking-tight">
                  {item.title}
                </h4>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </article>
            {index < automationFlow.steps.length - 1 && (
              <>
                <ArrowDown
                  className="absolute -bottom-2 left-8 z-10 h-4 w-4 translate-y-1/2 text-primary lg:hidden"
                  aria-hidden="true"
                />
                <ArrowRight
                  className="absolute -right-2 top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 text-primary lg:block"
                  aria-hidden="true"
                />
              </>
            )}
          </li>
        ))}
      </ol>

      <p className="mt-5 flex items-center gap-3 text-sm text-foreground/85">
        <span className="h-px w-8 bg-primary" aria-hidden="true" />
        {automationFlow.note}
      </p>
    </div>
  );
}
