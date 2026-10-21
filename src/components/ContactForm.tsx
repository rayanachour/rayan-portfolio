import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { contactOptions, profile } from "@/data/content";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [need, setNeed] = useState<string>(contactOptions[0]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    // No endpoint configured → open the visitor's email client, pre-filled.
    if (!profile.formEndpoint) {
      const subject = encodeURIComponent(`${need} — ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nLooking for: ${need}\n\n${message}`,
      );
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(profile.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          need,
          message,
          _subject: `${need} — ${name}`,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    const firstName = name.trim().split(" ")[0];
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <span className="metal inline-flex h-12 w-12 items-center justify-center rounded-full">
          <Check size={20} />
        </span>
        <h3 className="display mt-6 text-3xl sm:text-4xl">
          Thanks, {firstName ? firstName : "there"}.
        </h3>
        <p className="mt-3 max-w-md text-sm tracking-tight text-muted-foreground">
          {profile.formEndpoint
            ? "Your message is in my inbox. I reply within one business day — usually faster."
            : "Your email app should have opened with everything filled in. Just hit send and I'll reply within one business day."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Your name" htmlFor="name">
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Doe"
            className="glass-input"
          />
        </Field>
        <Field label="Email" htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@yourbusiness.com"
            className="glass-input"
          />
        </Field>
      </div>

      <fieldset>
        <legend className="eyebrow mb-3">What are you looking for?</legend>
        <div className="flex flex-wrap gap-2">
          {contactOptions.map((option) => {
            const active = option === need;
            return (
              <button
                key={option}
                type="button"
                onClick={() => setNeed(option)}
                aria-pressed={active}
                className={cn(
                  "rounded-full px-4 py-2 text-xs tracking-tight transition",
                  active
                    ? "metal"
                    : "glass glass-hover text-muted-foreground hover:text-foreground",
                )}
              >
                {option}
              </button>
            );
          })}
        </div>
      </fieldset>

      <Field label="Tell me about your business and what you need" htmlFor="message">
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="e.g. I run a two-chair barbershop in South Philly. I want a site where people can book online, and I'm tired of answering Instagram DMs at midnight."
          className="glass-input resize-y"
        />
      </Field>

      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs tracking-tight text-muted-foreground">
          Free consultation. No commitment. I reply within one business day.
        </p>
        <Button
          type="submit"
          variant="metal"
          size="lg"
          disabled={status === "sending"}
        >
          {status === "sending" ? (
            <>
              Sending <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            </>
          ) : (
            <>
              Send message <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-secondary">
          Something went wrong sending that. Email me directly at{" "}
          <a className="underline" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          .
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="eyebrow">
        {label}
      </label>
      {children}
    </div>
  );
}
