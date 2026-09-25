import { site } from "@/lib/site";
import { LocalTime } from "@/components/local-time";

const links = [
  { href: site.socials.github, label: "GitHub" },
  { href: site.socials.linkedin, label: "LinkedIn" },
  { href: site.socials.x, label: "X" },
  { href: `mailto:${site.email}`, label: "Email" },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 flex flex-col gap-4 border-t border-dashed border-border pt-8 pb-12 text-[13px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
      <p>
        © {new Date().getFullYear()} {site.name} ·{" "}
        <span className="font-mono text-[11px]">
          <LocalTime /> IST
        </span>
      </p>
      <ul className="flex gap-4">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
