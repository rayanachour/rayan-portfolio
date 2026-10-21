import Head from "next/head";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn, scrollTo } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import styles from "@/styles/Container.module.css";
import { profile } from "@/data/content";

type ContainerProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
};

type NavProps = {
  text: string;
  href: string;
};

const navLinks = [
  { href: "#services", text: "Solutions" },
  { href: "#process", text: "How it works" },
  { href: "#faq", text: "FAQ" },
];

function handleClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  const href = e.currentTarget.getAttribute("href");

  if (href && href.startsWith("#")) {
    e.preventDefault();
    const section = document.querySelector(href);
    scrollTo(section);
  }
}

function NavItem(props: NavProps) {
  return (
    <li>
      <a href={props.href} onClick={handleClick} className="nav-link">
        {props.text}
      </a>
    </li>
  );
}

export default function Container(props: ContainerProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { children, ...customMeta } = props;
  const router = useRouter();
  const meta = {
    title: `${profile.name} — Websites & Practical AI Automation`,
    description:
      "Practical websites and automations built around how your business works.",
    type: "website",
    ...customMeta,
  };
  const pageUrl = profile.siteUrl ? `${profile.siteUrl}${router.asPath}` : "";
  const socialImage = profile.siteUrl
    ? `${profile.siteUrl}${profile.socialImage}`
    : "";
  const contactHref = profile.schedulingUrl || "#contact";
  const contactLabel = profile.schedulingUrl
    ? "Book a discovery call"
    : "Request a discovery call";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const menu = menuRef.current;
    const menuButton = menuButtonRef.current;
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");
    const focusableSelector =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");
    document.body.style.overflow = "hidden";

    const focusTimer = window.requestAnimationFrame(() => {
      menu?.querySelector<HTMLElement>(focusableSelector)?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }

      if (event.key !== "Tab" || !menu) return;
      const focusable = Array.from(
        menu.querySelectorAll<HTMLElement>(focusableSelector),
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      document.body.style.overflow = "";
      menuButton?.focus();
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta name="theme-color" content="#080E0C" />
        <meta content={meta.description} name="description" />
        {pageUrl && <meta property="og:url" content={pageUrl} />}
        {pageUrl && <link rel="canonical" href={pageUrl} />}
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content={profile.name} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        {socialImage && <meta property="og:image" content={socialImage} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        {socialImage && <meta name="twitter:image" content={socialImage} />}
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </Head>
      <header
        className={cn(
          styles.nav,
          isScrolled
            ? "bg-gradient-to-b from-background via-background/90 to-transparent transition"
            : "bg-transparent",
        )}
      >
        <Link
          href="#home"
          onClick={handleClick}
          className="font-serif text-2xl tracking-tight focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {profile.handle}
          <span className="text-gradient">.</span>
        </Link>

        <div className="hidden items-center gap-6 sm:flex">
          <nav aria-label="Primary navigation">
            <ul className={styles["desktop-nav"]}>
              {navLinks.map((link) => (
                <NavItem key={link.href} {...link} />
              ))}
            </ul>
          </nav>
          <Button asChild size="sm">
            <Link
              href={contactHref}
              target={profile.schedulingUrl ? "_blank" : undefined}
              rel={profile.schedulingUrl ? "noreferrer" : undefined}
              onClick={profile.schedulingUrl ? undefined : handleClick}
            >
              {contactLabel}
            </Link>
          </Button>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:hidden"
          aria-controls="mobile-menu"
          aria-expanded={isOpen}
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={menuRef}
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              className="fixed inset-0 z-50 flex min-h-0 flex-col overflow-y-auto bg-background px-5 pb-8"
              initial={reduceMotion ? false : { x: "100%" }}
              animate={{ x: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { x: "100%" }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }
              }
            >
              <div className="flex min-h-20 items-center justify-between border-b border-border">
                <span className="font-serif text-2xl">
                  {profile.handle}
                  <span className="text-gradient">.</span>
                </span>
                <button
                  type="button"
                  onClick={closeMenu}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label="Close navigation menu"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <nav aria-label="Mobile navigation" className="flex flex-1 flex-col py-10">
                <ul className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={(event) => {
                          handleClick(event);
                          closeMenu();
                        }}
                        className="block min-h-12 rounded-xl px-3 py-3 font-serif text-3xl tracking-tight text-foreground hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-10">
                  <Button asChild size="lg" className="w-full">
                    <Link
                      href={contactHref}
                      target={profile.schedulingUrl ? "_blank" : undefined}
                      rel={profile.schedulingUrl ? "noreferrer" : undefined}
                      onClick={(event) => {
                        if (!profile.schedulingUrl) handleClick(event);
                        closeMenu();
                      }}
                    >
                      {contactLabel}
                    </Link>
                  </Button>
                  <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
                    Start with one repetitive task. No technical knowledge needed.
                  </p>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className={cn("container", props.className)}>{children}</main>
      <Footer />
    </>
  );
}
