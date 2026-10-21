import Container from "@/components/Container";
import ContactForm from "@/components/ContactForm";
import { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CalendarCheck,
  Check,
  ChevronRight,
  Code2,
  Frame,
  MonitorSmartphone,
  SearchCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { cn, scrollTo } from "@/lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  aboutCopy,
  aboutStats,
  aiAutomation,
  audience,
  faq,
  processSteps,
  profile,
  services,
} from "@/data/content";

const serviceIcons: Record<string, LucideIcon> = {
  Code2,
  Frame,
  SearchCheck,
  MonitorSmartphone,
  CalendarCheck,
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.2, 0.8, 0.2, 1] },
  }),
};

const goToContact = () => scrollTo(document.querySelector("#contact"));

export default function Home() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  // Highlight the nav link for the section in view. Native scrolling —
  // no smooth-scroll library, so the browser can composite normally.
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("section"));
    const navLinks = Array.from(document.querySelectorAll(".nav-link"));
    let ticking = false;

    function update() {
      ticking = false;
      const y = window.scrollY;
      setIsScrolled(y > 0);

      let current = "";
      for (const section of sections) {
        if (y >= section.offsetTop - 250) current = section.id;
      }
      for (const link of navLinks) {
        link.classList.toggle(
          "nav-active",
          link.getAttribute("href") === `#${current}`,
        );
      }
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Container>
      <div>
        {/* Prism light — a single static gradient, painted once */}
        <div className="prism" aria-hidden="true" />

        {/* ------------------------------------------------------------ */}
        {/* Hero                                                           */}
        {/* ------------------------------------------------------------ */}
        <section
          id="home"
          className="mt-32 flex w-full flex-col items-center gap-14 xl:mt-0 xl:min-h-screen xl:flex-row xl:items-center xl:justify-between xl:gap-16"
        >
          <div className={cn(styles.intro, "xl:max-w-[38rem]")}>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="eyebrow"
            >
              {profile.role} — {profile.location}
            </motion.p>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="display mt-6 text-[3.5rem] sm:text-7xl 2xl:text-[6rem]"
            >
              Your business,{" "}
              <span className="text-gradient italic">running smoother.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="mt-6 max-w-lg text-base leading-relaxed tracking-tight text-muted-foreground 2xl:text-lg"
            >
              {profile.tagline}
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="mt-6 flex flex-wrap items-center gap-1.5"
            >
              {profile.pills.map((item) => (
                <span key={item} className={styles.pill}>
                  {item}
                </span>
              ))}
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
              className="mt-8 flex flex-row flex-wrap items-center gap-3"
            >
              <Button variant="metal" onClick={goToContact}>
                {profile.cta} <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
              <Button
                variant="glass"
                onClick={() => scrollTo(document.querySelector("#services"))}
              >
                See what I do
              </Button>
            </motion.div>

            {/* Trust line */}
            <motion.ul
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={5}
              className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2"
            >
              {profile.trust.map((t) => (
                <li
                  key={t}
                  className="flex items-center gap-2 text-xs tracking-tight text-muted-foreground"
                >
                  <Check className="h-3.5 w-3.5 text-secondary" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </motion.ul>

            <div
              className={cn(
                styles.scroll,
                isScrolled && styles["scroll--hidden"],
              )}
            >
              <span className="eyebrow">Scroll to discover</span>
              <TriangleDownIcon className="mt-2 animate-bounce" />
            </div>
          </div>

          {/* Portrait — the glass chip overlaps the photo so the frost is visible (tip #6) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative w-full max-w-[26rem] xl:max-w-[30rem]"
          >
            <div className={styles.portrait}>
              <Image
                src={profile.photo}
                alt={`${profile.name}, seated on a marble bench in Philadelphia`}
                width={692}
                height={1024}
                priority
                sizes="(min-width: 1280px) 30rem, 26rem"
              />
            </div>
            <div className="glass glass-frost absolute -bottom-2 left-6 right-6 flex items-center justify-between rounded-2xl px-5 py-4">
              <div className="flex flex-col gap-1.5">
                <span className="eyebrow">{profile.name}</span>
                <span className="text-sm tracking-tight text-foreground">
                  {profile.dayJob} — {profile.company}
                </span>
              </div>
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-secondary" />
              </span>
            </div>
          </motion.div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/* About                                                          */}
        {/* ------------------------------------------------------------ */}
        <section id="about" className="mt-40 xl:mt-0">
          <div className="flex max-w-5xl flex-col justify-start">
            <span className="eyebrow">About</span>
            <h2 className="display mt-6 text-3xl leading-[1.15] text-foreground sm:text-4xl xl:text-[2.75rem]">
              {aboutCopy}
            </h2>

            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3 xl:gap-10">
              {aboutStats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-start">
                  <span className="display text-gradient text-5xl xl:text-7xl">
                    {stat.value}
                  </span>
                  <span className="mt-2 max-w-[16rem] text-sm tracking-tight text-muted-foreground xl:text-base">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Who it's for */}
          <div className="relative mt-20">
            <div className="dot-grid absolute inset-0 -z-10" aria-hidden="true" />
            <div className="glass flex flex-col gap-6 rounded-3xl p-8 md:flex-row md:items-center md:justify-between xl:p-10">
              <div className="md:max-w-xs">
                <span className="eyebrow">Who I work with</span>
                <p className="mt-3 font-serif text-2xl tracking-tight xl:text-3xl">
                  Owner-run businesses that live on word of mouth — and want
                  the online experience to match.
                </p>
              </div>
              <ul className="grid flex-1 grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
                {audience.map((a) => (
                  <li
                    key={a}
                    className="flex items-center gap-2.5 text-sm tracking-tight text-foreground/85"
                  >
                    <span
                      className="h-px w-4 shrink-0 bg-gradient-to-r from-primary to-secondary"
                      aria-hidden="true"
                    />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/* Services                                                       */}
        {/* ------------------------------------------------------------ */}
        <section id="services" className="my-40">
          <div>
            <span className="eyebrow">What I do</span>
            <h2 className="display mt-6 text-4xl sm:text-5xl xl:text-6xl">
              More bookings. <span className="text-gradient italic">Less admin.</span>
            </h2>
            <p className="mt-4 max-w-2xl text-base tracking-tight text-muted-foreground xl:text-lg">
              Two things make the biggest difference for a local business: a
              website people trust, and the busywork handled for you. I do both.
            </p>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ staggerChildren: 0.08 }}
              className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3"
            >
              {/* Featured: AI automation */}
              <motion.div
                variants={fadeUp}
                className="glass glass-strong glass-hover relative flex flex-col overflow-hidden rounded-3xl p-8 md:col-span-2 xl:row-span-2 xl:p-10"
              >
                <div
                  className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full"
                  style={{
                    background:
                      "radial-gradient(closest-side, hsl(26 90% 72% / 0.28), hsl(26 90% 72% / 0.08) 50%, transparent 72%)",
                  }}
                  aria-hidden="true"
                />
                <div className="flex items-center gap-3">
                  <span className="metal inline-flex h-10 w-10 items-center justify-center rounded-full">
                    <Sparkles size={18} />
                  </span>
                  <span className="eyebrow">Most popular</span>
                </div>
                <h3 className="mt-6 font-serif text-3xl tracking-tight xl:text-4xl">
                  {aiAutomation.service}
                </h3>
                <p className="mt-3 max-w-xl text-base tracking-tight text-foreground/85">
                  {aiAutomation.lead}
                </p>

                <div className="mt-8 grid gap-8 lg:grid-cols-2">
                  <div>
                    <span className="eyebrow">Sound familiar?</span>
                    <ul className="mt-4 flex flex-col gap-3">
                      {aiAutomation.problems.map((p) => (
                        <li
                          key={p}
                          className="flex gap-3 text-sm leading-relaxed tracking-tight text-muted-foreground"
                        >
                          <span
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary"
                            aria-hidden="true"
                          />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="eyebrow">What you get</span>
                    <ul className="mt-4 flex flex-col gap-3">
                      {aiAutomation.outcomes.map((o) => (
                        <li
                          key={o}
                          className="flex gap-3 text-sm leading-relaxed tracking-tight text-foreground/85"
                        >
                          <Check
                            className="mt-1 h-3.5 w-3.5 shrink-0 text-primary"
                            aria-hidden="true"
                          />
                          {o}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <p className="mt-8 max-w-2xl text-sm leading-relaxed tracking-tight text-muted-foreground">
                  {aiAutomation.solution}
                </p>
                <div className="mt-6">
                  <Button variant="metal" size="sm" onClick={goToContact}>
                    Get a free automation audit{" "}
                    <ChevronRight className="ml-1 h-3.5 w-3.5" />
                  </Button>
                </div>
              </motion.div>

              {services.map((service) => {
                const Icon = serviceIcons[service.icon] ?? Code2;
                return (
                  <motion.div
                    key={service.service}
                    variants={fadeUp}
                    className="glass glass-hover flex flex-col items-start justify-end rounded-3xl p-8"
                  >
                    <Icon className="text-primary" size={20} />
                    <span className="mt-auto pt-8 font-serif text-2xl tracking-tight text-foreground">
                      {service.service}
                    </span>
                    <span className="mt-2 text-sm leading-relaxed tracking-tight text-muted-foreground">
                      {service.description}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/* Process                                                        */}
        {/* ------------------------------------------------------------ */}
        <section id="process" className="my-40">
          <div>
            <span className="eyebrow">How it works</span>
            <h2 className="display mt-6 text-4xl sm:text-5xl xl:text-6xl">
              Simple from <span className="text-gradient italic">start to launch</span>.
            </h2>

            <ol className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {processSteps.map((step, i) => (
                <motion.li
                  key={step.step}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  custom={i}
                  className="glass glass-hover relative flex flex-col rounded-3xl p-8"
                >
                  <span className="display text-gradient text-5xl">{step.step}</span>
                  <h3 className="mt-8 font-serif text-2xl tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed tracking-tight text-muted-foreground">
                    {step.description}
                  </p>
                  {i < processSteps.length - 1 && (
                    <ArrowRight
                      className="absolute -right-4 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-foreground/30 xl:block"
                      aria-hidden="true"
                    />
                  )}
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/* FAQ                                                            */}
        {/* ------------------------------------------------------------ */}
        <section id="faq" className="my-40">
          <div className="grid gap-10 xl:grid-cols-[20rem_1fr]">
            <div>
              <span className="eyebrow">Questions</span>
              <h2 className="display mt-6 text-4xl sm:text-5xl">
                Things owners <span className="text-gradient italic">usually ask</span>.
              </h2>
              <p className="mt-4 text-sm tracking-tight text-muted-foreground">
                Something else on your mind? Ask it in the form below — there
                are no silly questions.
              </p>
            </div>
            <dl>
              {faq.map((item, i) => (
                <div key={item.q}>
                  {i > 0 && <hr className="divider-inset my-7" />}
                  <dt className="font-serif text-2xl tracking-tight">{item.q}</dt>
                  <dd className="mt-2 max-w-2xl text-sm leading-relaxed tracking-tight text-muted-foreground">
                    {item.a}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/* Contact                                                        */}
        {/* ------------------------------------------------------------ */}
        <section id="contact" className="my-40">
          <div className="relative">
            {/* texture + glow behind the glass so the frost reads (tip #6).
                Both are plain gradients — no filter: blur — so they paint once. */}
            <div className="dot-grid absolute inset-0 -z-10" aria-hidden="true" />
            <div className="glow-contact absolute inset-0 -z-10 rounded-[2rem]" aria-hidden="true" />
            <div className="glass glass-frost grid gap-12 rounded-[2rem] p-8 sm:p-12 xl:grid-cols-[22rem_1fr] xl:p-16">
              <div>
                <span className="eyebrow">Contact</span>
                <h2 className="display mt-6 text-5xl sm:text-6xl">
                  Let&apos;s talk about{" "}
                  <span className="text-gradient italic">your</span> business.
                </h2>
                <p className="mt-5 text-base tracking-tight text-muted-foreground">
                  Tell me a little about what you do and what&apos;s eating your
                  time. I&apos;ll come back with ideas — free, no commitment.
                </p>
                <div className="mt-8 flex flex-col gap-3 text-sm">
                  <span className="eyebrow">Prefer email?</span>
                  <Link
                    href={`mailto:${profile.email}`}
                    className="font-mono text-xs text-foreground underline-offset-4 hover:underline"
                  >
                    {profile.email}
                  </Link>
                </div>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
}
