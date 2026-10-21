import Link from "next/link";
import { Github, Mail } from "lucide-react";
import { profile } from "@/data/content";

export default function Footer() {
  return (
    <footer className="w-full">
      <hr className="divider-inset" />
      <div className="container mx-auto flex flex-col gap-4 py-7 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          <span className="font-serif text-lg text-foreground">{profile.name}.</span>{" "}
          © {new Date().getFullYear()}
        </p>
        <div className="flex items-center gap-2">
          <Link
            href={`mailto:${profile.email}`}
            className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm text-muted-foreground transition hover:bg-card hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            Email Rayan
          </Link>
          <Link
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition hover:bg-card hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Rayan on GitHub"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
