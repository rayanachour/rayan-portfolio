/**
 * Business-facing copy and configuration.
 * Keep this plain, specific, and free of unsupported claims.
 */
export const profile = {
  name: "Rayan",
  handle: "rayan",
  email: "rachour511@gmail.com",
  github: "https://github.com/rayanachour",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "",
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "",
  schedulingUrl: process.env.NEXT_PUBLIC_SCHEDULING_URL ?? "",
  socialImage: "/social-preview.png",
  intro:
    "I’m Rayan, a software engineer building practical websites and automations around how your business works.",
} as const;

export const hero = {
  eyebrow: "Websites & practical AI automation",
  headline: "Less busywork. More room to grow.",
  description:
    "I build websites and automations that help your business respond to customers, simplify bookings, and keep everyday work moving.",
  principles: [
    "Built around your workflow",
    "Clear scope before development",
    "Human handoff when needed",
  ],
  microcopy:
    "Start with one repetitive task. No technical knowledge needed.",
} as const;

export const heroWorkflow = {
  label: "Example workflow",
  title: "From inquiry to next step",
  steps: [
    "A customer asks a question",
    "The assistant replies using your approved information",
    "They receive a booking link or your team takes over",
  ],
  caption: "Illustrative example—not a live customer conversation.",
} as const;

export const about = {
  eyebrow: "Built around your business",
  heading:
    "You don’t need more tools. You need less work falling through the cracks.",
  body:
    "Missed inquiries, manual reminders, and scattered information take attention away from customers. I help identify the repetitive work and build a practical way to handle it.",
  audience: [
    "Appointment-based businesses",
    "Local service businesses",
    "Consultants and small teams",
    "Owner-operated businesses",
  ],
} as const;

export const services = {
  eyebrow: "Solutions",
  heading: "Practical support for the work customers can’t see.",
  intro:
    "Start with the part of your business that creates the most friction. The solution should make the next step clearer—not add another system to manage.",
  automation: {
    title: "Let repetitive work move without constant chasing.",
    description:
      "Connect the right steps so inquiries, reminders, and follow-ups don’t depend on someone remembering every time.",
    examples: [
      "Respond to common questions using approved information.",
      "Route inquiries and send booking links.",
      "Trigger reminders and follow-ups from connected tools.",
    ],
    qualifier:
      "What’s possible depends on your tools and workflow. Important or unusual requests can be routed to a person.",
  },
  supporting: [
    {
      title: "Websites that make the next step clear",
      description:
        "A clear, mobile-friendly website that helps customers understand your business and take action.",
      icon: "Layout",
    },
    {
      title: "Booking & follow-up",
      description:
        "Connect forms, calendars, and reminders so less information needs to be copied by hand.",
      icon: "Calendar",
    },
  ],
  deliveryNote:
    "Responsive design, performance, accessibility, and essential search metadata are part of every website delivery.",
} as const;

export const automationFlow = {
  heading: "What this could look like in your business",
  intro: "An example—not a one-size-fits-all package.",
  steps: [
    {
      step: "01",
      title: "A customer reaches out",
      description:
        "A message arrives through a connected website form or supported messaging channel.",
    },
    {
      step: "02",
      title: "They get a useful response",
      description:
        "Common questions are answered using information you approve.",
    },
    {
      step: "03",
      title: "The next step is clear",
      description:
        "The customer receives a booking link, or the request is passed to your team.",
    },
    {
      step: "04",
      title: "Follow-up happens",
      description:
        "Once an appointment is recorded in a connected system, reminders can be sent automatically.",
    },
  ],
  note: "You decide what gets automated and when a person steps in.",
} as const;

export const processSteps = [
  {
    step: "01",
    title: "Find the bottleneck",
    description:
      "We look at the repetitive task that takes too much attention.",
  },
  {
    step: "02",
    title: "Agree on the plan",
    description:
      "You get a clear scope, proposed approach, and pricing before development.",
  },
  {
    step: "03",
    title: "Test it together",
    description:
      "We review the workflow using realistic examples and refine the handoff.",
  },
  {
    step: "04",
    title: "Launch with clarity",
    description:
      "You know what runs automatically, what needs your attention, and what support is included.",
  },
] as const;

export const faq = [
  {
    q: "Do I need to understand AI?",
    a: "No. You explain how the work happens today, and I translate that into a practical approach in plain English.",
  },
  {
    q: "Can this work with the tools I already use?",
    a: "Possibly. I check compatibility, access, and limitations before recommending an approach.",
  },
  {
    q: "What happens when a person needs to take over?",
    a: "The handoff is designed around your workflow, including which requests should stop and reach a person.",
  },
  {
    q: "How are pricing and timing decided?",
    a: "Scope, costs, dependencies, and timing are discussed before development begins.",
  },
] as const;

export const urgency = {
  heading: "What keeps getting pushed to tomorrow?",
  body:
    "If inquiries, reminders, or admin keep slipping, start with one workflow. We’ll look at what can be simplified and whether automation is the right fit.",
} as const;

export const contactOptions = [
  "Customer inquiries",
  "Booking & reminders",
  "Follow-up",
  "Website",
  "Not sure yet",
] as const;
