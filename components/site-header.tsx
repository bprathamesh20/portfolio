"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import { LocalTime } from "@/components/local-time";
import { ThemeToggle } from "@/components/theme-toggle";

const nav = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Work" },
  { href: "/blog", label: "Writing" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    // On phones the nav drops below the name so neither line gets squeezed.
    <header className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      <div className="flex items-start gap-3.5">
        <Link href="/" aria-label="Home" className="shrink-0">
          <Image
            src="/avatar.jpg"
            alt={site.name}
            width={44}
            height={44}
            priority
            className="rounded-[10px] shadow-[0_1px_2px_rgb(0_0_0/0.08)] ring-1 ring-inset ring-foreground/10"
          />
        </Link>
        <div>
          <Link href="/" className="whitespace-nowrap text-[15px] font-medium tracking-[-0.01em]">
            {site.name}
          </Link>
          <p className="text-[15px] text-muted-foreground">{site.role}</p>
          <p className="mt-3 font-mono text-[11px] text-muted-foreground">
            {site.location} · <LocalTime />
          </p>
        </div>
      </div>

      <nav className="-ml-2 flex items-center gap-1 text-[13px] sm:-mt-1 sm:ml-0">
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
