"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import { LocalTime } from "@/components/local-time";
import { ThemeToggle } from "@/components/theme-toggle";

// On small screens the name already links home, so "Home" is hidden there.
const nav = [
  { href: "/", label: "Home", className: "hidden sm:inline-flex" },
  { href: "/projects", label: "Work" },
  { href: "/blog", label: "Writing" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header>
      {/* Only the name shares a row with the nav, so the role line never gets squeezed on phones. */}
      <div className="flex items-start justify-between gap-4">
        <Link href="/" className="whitespace-nowrap text-[15px] font-medium tracking-[-0.01em]">
          {site.name}
        </Link>

        <nav className="-mt-1 flex items-center gap-0.5 text-[13px] sm:gap-1">
          {nav.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-full px-2 py-1 transition-colors sm:px-2.5",
                  item.className,
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <span className="mx-1 h-3.5 w-px bg-border" aria-hidden />
          <ThemeToggle />
        </nav>
      </div>
      <p className="text-[15px] text-muted-foreground">
        {site.title} at{" "}
        <a href={site.company.url} target="_blank" rel="noopener" className="link text-muted-foreground hover:text-foreground">
          {site.company.name}
        </a>
      </p>
      <p className="mt-3 font-mono text-[11px] text-muted-foreground">
        {site.location} · <LocalTime />
      </p>
    </header>
  );
}
