"use client";

import { motion } from "framer-motion";
import profileData from "@/data/profile.json";

export default function MetricsSection() {
  const metrics = profileData.metrics || [];

  return (
    <section className="py-20 px-4 sm:px-8 border-t border-border bg-background relative">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {metrics.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="hud-corner glass-panel p-6 sm:p-8 rounded-2xl border border-border hover:border-accent hover:shadow-[0_0_20px_var(--accent-glow)] transition-all duration-300"
            >
              <div className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-foreground tracking-tight mb-2">
                {metric.value}
              </div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-accent mb-1">
                {metric.label}
              </div>
              <p className="text-[11px] font-mono text-muted-foreground leading-normal">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
