import { useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  CalendarCheck2,
  Check,
  LayoutTemplate,
  ShieldCheck,
} from "lucide-react";
import Container from "@/components/Container";
import ContactForm from "@/components/ContactForm";
import HeroWorkflow from "@/components/HeroWorkflow";
import AutomationFlow from "@/components/AutomationFlow";
import { Button } from "@/components/ui/button";
import { scrollTo } from "@/lib/utils";
import {
  about,
  faq,
  hero,
  processSteps,
  profile,
  services,
  urgency,
} from "@/data/content";

export default function Home() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("section"));
    const navLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>(".nav-link"),
    );
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      let currentTarget = "";

      for (const section of sections) {
        if (y >= section.offsetTop - 220) {
          currentTarget =
            section.dataset.navTarget ?? `#${section.getAttribute("id") ?? ""}`;
        }
      }

      navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === currentTarget;
        link.classList.toggle("nav-active", isActive);
        if (isActive) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const contactHref = profile.schedulingUrl || "#contact";
  const contactLabel = profile.schedulingUrl
    ? "Book a discovery call"
    : "Request a discovery call";

  return (
    <Container>
      <div>
        <div className="prism" aria-hidden="true" />

        <section
          id="home"
          className="flex min-h-screen w-full flex-col justify-center gap-12 pb-20 pt-32 lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(24rem,0.95fr)] lg:items-center lg:gap-16 lg:pt-24"
        >
          <div className="max-w-[42rem]">
            <p className="eyebrow">{hero.eyebrow}</p>
            <h1 className="display mt-6 text-[3.75rem] sm:text-7xl xl:text-[6rem]">
              Less busywork.
              <br />
              <span className="text-gradient italic">More room to grow.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {hero.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg">
                <Link
                  href={contactHref}
                  target={profile.schedulingUrl ? "_blank" : undefined}
                  rel={profile.schedulingUrl ? "noreferrer" : undefined}
                  onClick={
                    profile.schedulingUrl
                      ? undefined
                      : (event) => {
                          event.preventDefault();
                          scrollTo(document.querySelector("#contact"));
                        }
                  }
                >
                  {contactLabel}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="glass" size="lg">
                <Link
                  href="#automation-example"
                  onClick={(event) => {
                    event.preventDefault();
                    scrollTo(document.querySelector("#automation-example"));
                  }}
                >
                  See how it works
                </Link>
              </Button>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {hero.microcopy}
            </p>

            <ul
              className="mt-8 grid gap-3 sm:grid-cols-3"
              aria-label="Working principles"
            >
              {hero.principles.map((principle) => (
                <li
                  key={principle}
                  className="flex items-start gap-2 text-sm leading-relaxed text-foreground/80"
                >
                  <Check
                    className="mt-1 h-4 w-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  {principle}
                </li>
              ))}
            </ul>
          </div>

          <HeroWorkflow />
        </section>

        <section
          id="about"
          data-nav-target="#services"
          className="py-24 sm:py-32"
        >
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)] lg:items-start">
            <div>
              <p className="eyebrow">{about.eyebrow}</p>
              <h2 className="display mt-6 max-w-4xl text-4xl leading-[1.04] sm:text-5xl xl:text-6xl">
                {about.heading}
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {about.body}
              </p>
              <p className="mt-6 max-w-2xl border-l-2 border-primary/60 pl-5 text-base leading-relaxed text-foreground/85">
                {profile.intro}
              </p>
            </div>

            <aside className="glass rounded-3xl p-6 sm:p-8">
              <p className="eyebrow">A practical fit for</p>
              <ul className="mt-5 space-y-3">
                {about.audience.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-base text-foreground/85"
                  >
                    <span
                      className="h-px w-6 shrink-0 bg-primary"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section
          id="services"
          data-nav-target="#services"
          className="py-24 sm:py-32"
        >
          <div className="max-w-3xl">
            <p className="eyebrow">{services.eyebrow}</p>
            <h2 className="display mt-6 text-4xl sm:text-5xl xl:text-6xl">
              {services.heading}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {services.intro}
            </p>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-[1.45fr_0.75fr]">
            <article
              className="glass glass-strong relative row-span-2 overflow-hidden rounded-[2rem] p-7 sm:p-10"
            >
              <div
                className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[radial-gradient(circle,hsl(var(--primary)/0.18),transparent_68%)]"
                aria-hidden="true"
              />
              <div className="relative">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Bot className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="eyebrow mt-6">AI automation</p>
                <h3 className="mt-3 max-w-2xl font-serif text-3xl tracking-tight sm:text-4xl">
                  {services.automation.title}
                </h3>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                  {services.automation.description}
                </p>

                <ul className="mt-7 space-y-3">
                  {services.automation.examples.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-base leading-relaxed text-foreground/85"
                    >
                      <Check
                        className="mt-1 h-4 w-4 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <p className="mt-8 rounded-2xl border border-primary/15 bg-primary/[0.05] px-4 py-4 text-sm leading-relaxed text-muted-foreground">
                  {services.automation.qualifier}
                </p>
              </div>
            </article>

            {services.supporting.map((service) => {
              const Icon = service.icon === "Layout" ? LayoutTemplate : CalendarCheck2;
              return (
                <article
                  key={service.title}
                  className="glass rounded-[2rem] p-7 sm:p-8"
                >
                  <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  <h3 className="mt-8 font-serif text-3xl tracking-tight">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </article>
              );
            })}
          </div>

          <p className="mt-5 flex max-w-4xl items-start gap-3 text-sm leading-relaxed text-muted-foreground">
            <ShieldCheck
              className="mt-0.5 h-4 w-4 shrink-0 text-primary"
              aria-hidden="true"
            />
            {services.deliveryNote}
          </p>

          <div id="automation-example">
            <AutomationFlow />
          </div>
        </section>

        <section
          id="process"
          data-nav-target="#process"
          className="py-24 sm:py-32"
        >
          <div className="max-w-3xl">
            <p className="eyebrow">How working together works</p>
            <h2 className="display mt-6 text-4xl sm:text-5xl xl:text-6xl">
              From one bottleneck to a{" "}
              <span className="text-gradient italic">practical solution.</span>
            </h2>
          </div>

          <ol className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((step, index) => (
              <li
                key={step.step}
                className="glass relative flex min-h-[18rem] flex-col rounded-3xl p-7"
              >
                <span className="display text-gradient text-5xl">{step.step}</span>
                <div className="mt-auto pt-10">
                  <h3 className="font-serif text-2xl tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
                {index < processSteps.length - 1 && (
                  <ArrowRight
                    className="absolute -right-2 top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 text-primary xl:block"
                    aria-hidden="true"
                  />
                )}
              </li>
            ))}
          </ol>
        </section>

        <section
          id="faq"
          data-nav-target="#faq"
          className="py-24 sm:py-32"
        >
          <div className="grid gap-12 lg:grid-cols-[20rem_1fr]">
            <div>
              <p className="eyebrow">Questions</p>
              <h2 className="display mt-6 text-4xl sm:text-5xl">
                Clear answers before{" "}
                <span className="text-gradient italic">anything starts.</span>
              </h2>
            </div>

            <dl>
              {faq.map((item, index) => (
                <div key={item.q}>
                  {index > 0 && <hr className="divider-inset my-7" />}
                  <dt className="font-serif text-2xl tracking-tight sm:text-3xl">
                    {item.q}
                  </dt>
                  <dd className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
                    {item.a}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section
          id="contact"
          data-nav-target="#contact"
          className="py-24 sm:py-32"
        >
          <div className="relative">
            <div className="dot-grid absolute inset-0 -z-10" aria-hidden="true" />
            <div
              className="glow-contact absolute inset-0 -z-10 rounded-[2rem]"
              aria-hidden="true"
            />
            <div className="glass glass-frost grid gap-12 rounded-[2rem] p-7 sm:p-12 lg:grid-cols-[minmax(17rem,0.72fr)_minmax(0,1.28fr)] xl:p-16">
              <div>
                <p className="eyebrow">Start with one workflow</p>
                <h2 className="display mt-6 text-4xl sm:text-5xl xl:text-6xl">
                  {urgency.heading}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                  {urgency.body}
                </p>

                {profile.schedulingUrl && (
                  <div className="mt-8">
                    <Button asChild size="lg">
                      <Link
                        href={profile.schedulingUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Book a discovery call
                        <ArrowRight
                          className="ml-2 h-4 w-4"
                          aria-hidden="true"
                        />
                      </Link>
                    </Button>
                    <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                      Choose a time in the scheduler, or send an inquiry using
                      the form.
                    </p>
                  </div>
                )}

                <Link
                  href={`mailto:${profile.email}`}
                  className="mt-7 inline-flex min-h-11 items-center text-sm text-muted-foreground underline decoration-border underline-offset-4 transition hover:text-foreground focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Email Rayan instead
                </Link>
              </div>

              <div>
                <h3 className="font-serif text-3xl tracking-tight sm:text-4xl">
                  {profile.schedulingUrl
                    ? "Send an inquiry"
                    : "Request a discovery call"}
                </h3>
                <p className="mt-3 mb-7 text-base leading-relaxed text-muted-foreground">
                  Share the task you want to improve. This sends a request—it
                  does not reserve a time.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
}
