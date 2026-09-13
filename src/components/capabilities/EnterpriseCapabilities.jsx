"use client";

import { motion } from "framer-motion";
import {
  Sliders,
  ShieldCheck,
  Database,
  Video,
  FileCheck,
  Brain,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const CAPABILITIES = [
  {
    id: "dynamic-apps",
    title: "Dynamic Applications",
    icon: Sliders,
    badge: "Metadata-Driven",
    description: "Metadata-driven forms, dynamic schema fields, configurable workflows, reusable HOC components, dynamic validation engines, and runtime-configurable business rules.",
    tags: ["JSON Schemas", "Dynamic Validation", "Reusable HOCs", "Runtime Rules"],
  },
  {
    id: "security-access",
    title: "Security & Access Control",
    icon: ShieldCheck,
    badge: "Zero-Trust",
    description: "JWT authentication, tenant-isolated RBAC authorization, permission-based access, encrypted sensitive payloads (AES-256), database PII masking, and expiring Azure SAS tokens.",
    tags: ["JWT Claims", "Tenant RBAC", "PII Redaction", "Azure SAS Vault"],
  },
  {
    id: "data-integrations",
    title: "Data & Integrations",
    icon: Database,
    badge: "High Throughput",
    description: "High-performance REST APIs, PostgreSQL and MongoDB data pipelines, third-party vendor synchronization (Shopify, QuickBooks, Greenbits), scheduled ETL cron jobs, and cloud file processing.",
    tags: ["PostgreSQL", "Node-RED ETL", "Webhook Queues", "Vendor Parity"],
  },
  {
    id: "real-time",
    title: "Real-Time Applications",
    icon: Video,
    badge: "Sub-150ms",
    description: "Low-latency WebRTC audio/video communication via Agora SD-RTN, live ICU telemetry streaming, collaborative Firebase session locks, push notifications, and WebSockets.",
    tags: ["Agora WebRTC", "Firebase Locks", "Telemetry Canvas", "Live Messaging"],
  },
  {
    id: "compliance-rules",
    title: "Compliance & Business Rules",
    icon: FileCheck,
    badge: "RegTech",
    description: "Configurable compliance workflows aligned with applicable U.S. regulatory standards—including Currency Transaction Reports (CTR), Suspicious Activity Reports (SAR), and AML audit histories.",
    tags: ["FinCEN Workflows", "CTR / SAR Engine", "AML Heuristics", "Audit Trails"],
  },
  {
    id: "ai-workflows",
    title: "AI-Assisted Workflows",
    icon: Brain,
    badge: "Decision Support",
    description: "AI-assisted telemetry analysis, clinical report summarization, suspicious pattern detection, and decision-support workflows with strict human-in-the-loop governance.",
    tags: ["Pattern Detection", "Lab Summaries", "Physician Assist", "Human In The Loop"],
  },
];

export default function EnterpriseCapabilities() {
  return (
    <section id="capabilities" className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-border/40 overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Full-Stack Engineering Depth</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-foreground">
            From Business Rules to Production Systems
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            In enterprise software engineering, the user interface is only the visible surface of a deeply interconnected system. I build across data structures, business logic, security protocols, and third-party integrations.
          </p>
        </div>

        {/* 6 Capability Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CAPABILITIES.map((cap) => {
            const Icon = cap.icon;

            return (
              <div
                key={cap.id}
                className="group p-7 rounded-2xl bg-surface/90 border border-border/80 shadow-lg backdrop-blur-md flex flex-col justify-between hover:border-accent hover:shadow-xl hover:shadow-accent/5 transition-all duration-300"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3 rounded-xl bg-accent/10 border border-accent/20 text-accent group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-background border border-border text-[11px] font-mono text-muted-foreground font-semibold">
                      {cap.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                    {cap.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {cap.description}
                  </p>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border/60">
                  {cap.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-background border border-border text-[11px] font-mono text-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
