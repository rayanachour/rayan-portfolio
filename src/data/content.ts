/**
 * Single source of truth for everything on the site.
 * Audience: business owners (salons, studios, clinics, local services) who
 * want a website or AI automation — NOT engineers. Keep copy plain and
 * outcome-focused. Edit this file; components only render what's here.
 */

export const profile = {
  firstName: "Rayan",
  lastName: "Achour",
  name: "Rayan Achour",
  handle: "rayan",
  role: "Websites & AI automation for businesses",
  dayJob: "Senior Software Engineer",
  company: "JPMorgan Chase",
  location: "Philadelphia, PA",
  timeZone: "America/New_York",
  timeZoneLabel: "ET",
  email: "rachour511@gmail.com",
  github: "https://github.com/rayanachour",
  githubHandle: "rayanachour",
  /** Set NEXT_PUBLIC_SITE_URL in .env once the site has a domain. */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "",
  /**
   * Contact form endpoint (Formspree / Web3Forms / your own API).
   * If unset, the form falls back to opening the visitor's email client.
   */
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "",
  photo: "/assets/rayan.jpg",
  tagline:
    "I build websites that bring in customers and automations that handle the busywork — so you can run your business.",
  intro:
    "You're great at what you do. You shouldn't also have to be a web designer, a receptionist and a bookkeeper. I build the website that makes people book, and the quiet automations that answer, remind and follow up while you work.",
  trust: [
    "Senior engineer at JPMorgan Chase",
    "Based in Philadelphia",
    "English · French · Arabic · Spanish",
  ],
  // The four languages Rayan speaks — used by the preloader.
  greetings: ["Hello", "Bonjour", "مرحباً", "Hola"],
  // Plain-English "what I do" pills for the hero
  pills: ["websites", "online booking", "ai receptionist", "lead follow-up"],
  // Primary CTA copy, used everywhere
  cta: "Book a free consultation",
} as const;

export const aboutCopy =
  "By day I'm a senior engineer at JPMorgan Chase, building systems that millions of people rely on. On the side I bring that same care to small businesses — salons, studios, clinics, local services — so your website looks premium, works on every phone, and the repetitive stuff runs itself.";

export const aboutStats = [
  { value: "3+", label: "Years building software at a major bank" },
  { value: "1:1", label: "You work directly with me — no agency handoffs" },
  { value: "4", label: "Languages spoken, for you and your customers" },
] as const;

export const audience = [
  "Salons & barbershops",
  "Spas & skin studios",
  "Tattoo & beauty studios",
  "Clinics & wellness",
  "Restaurants & cafés",
  "Contractors & local services",
  "Coaches & consultants",
  "Any small team drowning in admin",
] as const;

export const processSteps = [
  {
    step: "01",
    title: "Tell me what you need",
    description:
      "Fill in the short form below or email me. A sentence or two is plenty — I'll ask the right questions.",
  },
  {
    step: "02",
    title: "Free consultation & flat quote",
    description:
      "We talk for 20 minutes about your business and goals. You get a clear plan and one price. No surprises later.",
  },
  {
    step: "03",
    title: "See it before you commit",
    description:
      "I build a live preview you can open on your phone. We refine it together until it feels like your brand.",
  },
  {
    step: "04",
    title: "Launch, then I stay around",
    description:
      "I handle the technical setup end to end. After launch, I'm one message away for updates and fixes.",
  },
] as const;

export const services = [
  {
    service: "Website Design & Build",
    description:
      "A premium, fast website that makes people trust you and book — designed around your brand, not a template.",
    icon: "Code2",
  },
  {
    service: "Looks Perfect on Every Phone",
    description:
      "Most of your customers will find you on a phone in a waiting room. Your site will look sharp there, and on a 4K screen.",
    icon: "MonitorSmartphone",
  },
  {
    service: "Get Found on Google",
    description:
      "Set up so local searches like “barber near me” actually find you — the right words, speed, and structure.",
    icon: "SearchCheck",
  },
  {
    service: "Design That Feels Like You",
    description:
      "Colors, type and photos chosen with intent, so the site matches the experience people get when they walk in.",
    icon: "Frame",
  },
  {
    service: "Booking, Payments & Reminders",
    description:
      "Online booking, deposits and automatic reminders wired in — fewer no-shows, fewer phone calls, more revenue.",
    icon: "CalendarCheck",
  },
] as const;

export const aiAutomation = {
  service: "AI Automation for Your Business",
  lead: "Most small businesses don't have a technology problem — they have a repetition problem.",
  problems: [
    "A customer messages at 9 pm and nobody replies until tomorrow — they book elsewhere.",
    "You're typing the same info into your calendar, your phone and your spreadsheet.",
    "No-shows cost you money because reminders depend on someone remembering.",
    "You know you should ask for reviews after every visit — it rarely happens.",
  ],
  outcomes: [
    "Replies to inquiries in seconds, 24/7, in your tone",
    "Appointments booked, confirmed and reminded automatically",
    "Review requests sent after every visit",
    "A weekly summary of leads, bookings and revenue in your inbox",
  ],
  solution:
    "I set up assistants and workflows that connect the tools you already use — your phone, calendar, Instagram, email — and quietly do the repetitive work. You only step in for the exceptions.",
} as const;

export const faq = [
  {
    q: "Do I need to understand tech?",
    a: "No. You tell me how your business works; I handle everything technical and explain it in plain English.",
  },
  {
    q: "How long does it take?",
    a: "Most websites go live within a few weeks of our first call. Smaller automations can be running in days.",
  },
  {
    q: "What does it cost?",
    a: "You get one flat quote after the free consultation, based on exactly what you need. No hourly surprises.",
  },
  {
    q: "Can I update the site myself?",
    a: "Yes — I'll show you how. Or send me a message and I'll make the change for you.",
  },
  {
    q: "I already have a website. Can you improve it?",
    a: "Absolutely. I'll review what you have and tell you honestly whether to refine it or start fresh.",
  },
] as const;

export const contactOptions = [
  "A new website",
  "Improve my current website",
  "AI automation",
  "Website + automation",
  "Not sure yet",
] as const;

/* ------------------------------------------------------------------ */
/* Portfolio of apps — section removed for now; data model kept so the   */
/* carousel can be re-added once there are apps to show.                 */
/* ------------------------------------------------------------------ */
export type Project = {
  index: string;
  title: string;
  org: string;
  description: string;
  flow: readonly string[];
  hue: number;
  href?: string;
};

export const projects: readonly Project[] = [];
