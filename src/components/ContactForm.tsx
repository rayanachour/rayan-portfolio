import { useState, type FormEvent } from "react";
import { ArrowRight, Check, ExternalLink, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { contactOptions, profile } from "@/data/content";

type Status = "idle" | "sending" | "sent" | "draft" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [business, setBusiness] = useState("");
  const [need, setNeed] = useState<string>("");
  const [context, setContext] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [taskError, setTaskError] = useState(false);

  const hasEndpoint = Boolean(profile.formEndpoint);
  const hasScheduler = Boolean(profile.schedulingUrl);
  const submitLabel = !hasEndpoint
    ? "Open email draft"
    : hasScheduler
      ? "Send inquiry"
      : "Request a discovery call";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    if (!need) {
      setTaskError(true);
      return;
    }

    setTaskError(false);

    if (!hasEndpoint) {
      const subject = encodeURIComponent(`Discovery request — ${need}`);
      const body = encodeURIComponent(
        [
          `Name: ${name}`,
          `Email: ${email}`,
          `Business or website: ${business || "Not provided"}`,
          `Main task to improve: ${need}`,
          "",
          "Additional context:",
          context || "Not provided",
        ].join("\n"),
      );
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus("draft");
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
          business,
          need,
          context,
          _subject: `Discovery request — ${need}`,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent" && hasEndpoint) {
    return (
      <div
        className="flex flex-col items-center justify-center py-16 text-center"
        role="status"
        aria-live="polite"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check size={20} />
        </span>
        <h3 className="display mt-6 text-3xl sm:text-4xl">Request sent.</h3>
        <p className="mt-3 max-w-md text-sm tracking-tight text-muted-foreground">
          Your request has been sent. I’ll follow up to arrange the next step.
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

      <Field label="Business name or website (optional)" htmlFor="business">
        <input
          id="business"
          name="business"
          type="text"
          autoComplete="organization"
          value={business}
          onChange={(e) => setBusiness(e.target.value)}
          placeholder="Your business or website"
          className="glass-input"
        />
      </Field>

      <fieldset aria-required="true" aria-describedby={taskError ? "task-error" : undefined}>
        <legend className="eyebrow mb-3">Main task to improve</legend>
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
                  "inline-flex min-h-11 items-center rounded-full px-4 py-2 text-sm tracking-tight transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  active
                    ? "option-selected"
                    : "glass glass-hover text-muted-foreground hover:text-foreground",
                )}
              >
                {active && <Check className="mr-1.5 h-4 w-4" aria-hidden="true" />}
                {option}
              </button>
            );
          })}
        </div>
        {taskError && (
          <p id="task-error" role="alert" className="mt-3 text-sm text-destructive-foreground">
            Choose the main task you would like to improve.
          </p>
        )}
      </fieldset>

      <Field
        label="What repetitive task would you most like to stop doing? (optional)"
        htmlFor="context"
      >
        <textarea
          id="context"
          name="context"
          rows={4}
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="Keep this general—please don’t include customer or other sensitive information."
          className="glass-input resize-y"
        />
      </Field>

      {!hasEndpoint && (
        <p className="rounded-2xl border border-primary/20 bg-primary/[0.06] px-4 py-3 text-sm leading-relaxed text-muted-foreground">
          Submitting opens a pre-filled draft in your email app. You’ll need to
          review and send the draft yourself.
        </p>
      )}

      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-xs leading-relaxed text-muted-foreground">
          Please don’t include customer records, health information, passwords,
          or other sensitive data.
        </p>
        <Button
          type="submit"
          size="lg"
          disabled={status === "sending"}
        >
          {status === "sending" ? (
            <>
              Sending <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            </>
          ) : (
            <>
              {submitLabel}
              {!hasEndpoint ? (
                <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
              ) : (
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              )}
            </>
          )}
        </Button>
      </div>

      {status === "draft" && (
        <p
          role="status"
          aria-live="polite"
          className="rounded-2xl border border-primary/25 bg-primary/[0.07] px-4 py-3 text-sm leading-relaxed text-foreground/85"
        >
          An email draft should be open. Review it and press send. If nothing
          opened,{" "}
          <a
            className="font-medium text-primary underline underline-offset-4"
            href={`mailto:${profile.email}`}
          >
            email Rayan
          </a>
          .
        </p>
      )}

      {status === "error" && (
        <p
          role="alert"
          className="rounded-2xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive-foreground"
        >
          Your request wasn’t sent. Your answers are still here—try again or{" "}
          <a className="font-medium underline underline-offset-4" href={`mailto:${profile.email}`}>
            email Rayan
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
