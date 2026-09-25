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
  { href: "/blog", label: "Writing" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="flex items-start justify-between gap-6">
      <div>
        <Link href="/" className="whitespace-nowrap text-[15px] font-medium tracking-[-0.01em]">
          {site.name}
        </Link>
        <p className="text-[15px] text-muted-foreground">{site.role}</p>
        <p className="mt-3 font-mono text-[11px] text-muted-foreground">
          {site.location} · <LocalTime />
        </p>
      </div>

      <nav className="flex items-center gap-1 text-[13px]">
        {nav.map((item) => {
          const active =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "rounded-full px-2.5 py-1 transition-colors",
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
    </header>
  );
}
