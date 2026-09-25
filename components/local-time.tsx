"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const format = (date: Date) =>
  date.toLocaleTimeString("en-GB", {
    timeZone: site.timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

// Ticking local time. Renders a fixed-width placeholder on the server so the
// line doesn't shift when the clock hydrates.
export function LocalTime() {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    setNow(format(new Date()));
    const id = window.setInterval(() => setNow(format(new Date())), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <time suppressHydrationWarning className="tabular-nums">
      {now ?? "--:--:--"}
    </time>
  );
}
