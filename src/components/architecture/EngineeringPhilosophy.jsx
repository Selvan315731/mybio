"use client";

import { motion } from "framer-motion";
import {
  Boxes,
  Sliders,
  Cpu,
  Zap,
  ShieldCheck,
  HeartHandshake,
  Sparkles,
} from "lucide-react";

const PHILOSOPHY_PILLARS = [
  {
    id: "reusable",
    title: "Reusable Architecture",
    tagline: "Build once, reuse across modules.",
    icon: Boxes,
    description: "Design modular component ecosystems, reusable higher-order components (HOCs), and strictly typed contract schemas that eliminate redundancy and accelerate feature velocity.",
  },
  {
    id: "dynamic",
    title: "Dynamic Systems",
    tagline: "Design applications that adapt through configuration.",
    icon: Sliders,
    description: "Build metadata-driven engines where forms, fields, validation logic, and role-based views can be configured at runtime rather than hardcoding static screens.",
  },
  {
    id: "business-logic",
    title: "Business Logic",
    tagline: "Translate complex requirements into maintainable workflows.",
    icon: Cpu,
    description: "Deconstruct intricate regulatory compliance (AML/CTR/SAR), tax calculations (GST/Non-GST), and operational workflows into clean, deterministic, and testable code.",
  },
  {
    id: "performance",
    title: "Performance",
    tagline: "Optimize rendering, data loading, and large datasets.",
    icon: Zap,
    description: "Eliminate render churn, implement efficient state virtualization, throttle event streams, and engineer sub-150ms real-time WebRTC telemetry channels.",
  },
  {
    id: "security",
    title: "Security by Design",
    tagline: "Treat authorization and sensitive data as core architecture.",
    icon: ShieldCheck,
    description: "Incorporate zero-trust principles, JWT claims validation, tenant isolation middleware, database PII masking, and expiring Azure SAS tokens from day one.",
  },
  {
    id: "user-experience",
    title: "User Experience",
    tagline: "Complex backend systems should still feel simple to the user.",
    icon: HeartHandshake,
    description: "Abstract massive underlying database transactions, real-time queues, and compliance checkpoints into intuitive, frictionless, and responsive user interfaces.",
  },
];

export default function EngineeringPhilosophy() {
  return (
    <section id="philosophy" className="py-28 px-4 sm:px-8 border-t border-border bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Developer Principles</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-foreground tracking-tight">
            What I Focus On
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base font-medium mt-4 leading-relaxed">
            The core engineering beliefs and architectural disciplines that guide how I design, develop, and scale enterprise applications.
          </p>
        </div>

        {/* 6 Philosophy Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PHILOSOPHY_PILLARS.map((item, idx) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="p-8 rounded-2xl bg-surface/90 border border-border/80 shadow-lg backdrop-blur-md flex flex-col justify-between hover:border-accent hover:shadow-xl transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3 rounded-xl bg-accent/10 border border-accent/20 text-accent group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-muted-foreground font-bold">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-xs font-mono font-semibold text-accent mb-3">
                    {item.tagline}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
