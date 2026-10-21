import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Github, MailIcon } from "lucide-react";
import { profile } from "@/data/content";

export default function Footer() {
  // Local time in Philadelphia, regardless of where the visitor is.
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour12: true,
          hour: "numeric",
          minute: "numeric",
          timeZone: profile.timeZone,
        }),
      );
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full">
      <hr className="divider-inset" />
      <div className="container mx-auto flex flex-row items-center justify-between py-6">
        <span className="flex flex-row items-center space-x-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()}{" "}
            <Link
              href={profile.github}
              target="_blank"
              className="text-foreground transition hover:text-primary"
            >
              {profile.name}
            </Link>
          </p>
          <hr className="hidden h-6 border-l border-muted md:flex" />
          <span className="hidden flex-row items-center space-x-2 md:flex">
            <p className="eyebrow">Philadelphia</p>
            <p className="font-mono text-xs text-foreground">
              {time} {profile.timeZoneLabel}
            </p>
          </span>
        </span>
        <span className="flex flex-row items-center space-x-2">
          <Link href={profile.github} target="_blank" aria-label="GitHub">
            <Button variant="glass" size="sm" className="h-9 w-9 p-0">
              <Github className="h-4 w-4" />
            </Button>
          </Link>
          <Link href={`mailto:${profile.email}`}>
            <Button variant="glass" size="sm">
              <MailIcon className="h-4 w-4 md:mr-2" />
              <span className="hidden md:flex">{profile.email}</span>
            </Button>
          </Link>
        </span>
      </div>
    </footer>
  );
}
