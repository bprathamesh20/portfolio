"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

// Minimum time the splash stays up, so a fast load doesn't flash-and-vanish.
const MIN_DURATION = 900;

export function Loader() {
  const [loading, setLoading] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const start = performance.now();

    const finish = () => {
      const remaining = Math.max(0, MIN_DURATION - (performance.now() - start));
      window.setTimeout(() => setLoading(false), remaining);
    };

    if (document.readyState === "complete") {
      finish();
      return;
    }

    window.addEventListener("load", finish, { once: true });
    return () => window.removeEventListener("load", finish);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center gap-6">
            <motion.p
              className="text-xl md:text-2xl font-light tracking-[-0.03em] text-foreground"
              initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Automating the boring parts
            </motion.p>

            <div className="relative h-px w-32 overflow-hidden bg-border">
              {reduceMotion ? (
                <div className="absolute inset-y-0 left-0 w-1/3 bg-primary" />
              ) : (
                <motion.div
                  className="absolute inset-y-0 w-1/2 bg-primary"
                  animate={{ x: ["-110%", "210%"] }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
