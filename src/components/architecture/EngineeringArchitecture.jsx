"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Radio,
  Server,
  Cpu,
  Database,
  Cloud,
} from "lucide-react";

export default function EngineeringArchitecture() {
  const [activeTier, setActiveTier] = useState("api");

  const architectureTiers = [
    {
      id: "client",
      number: "01",
      name: "Omnichannel Client Layer",
      icon: Users,
      tech: "ReactJS • React Native (Android/iOS) • Vue.js • Agora WebRTC",
      description:
        "Metadata-driven component architecture, Redux Persist with AES256 encryption, custom snackbar notifications, and offline-first SQLite local session stores.",
      metrics: "60 FPS UI • Sub-100ms Hydration • Local Offline State",
    },
    {
      id: "edge",
      number: "02",
      name: "Security & Validation Gateway",
      icon: Radio,
      tech: "JWT Encrypted Payloads • RBAC Authorization • OPAC/DML Validation",
      description:
        "Dynamic entity validation (SSN / patron / address checks), Microsoft OAuth single sign-on, and automated sensitive data masking in logging layers.",
      metrics: "RBAC Enforced • PII Masking • Zero-Trust Gateway",
    },
    {
      id: "api",
      number: "03",
      name: "Node.js & Express REST Microservices",
      icon: Server,
      tech: "Node.js • Express.js • Reusable CRUD Endpoints • Middleware Handlers",
      description:
        "Modular utility endpoints (GET ALL, GET BY ID, upsert) powering high-frequency casino operations and third-party vendor synchronization.",
      metrics: "Asynchronous I/O • Reusable Modular Core",
    },
    {
      id: "business",
      number: "04",
      name: "Business Logic & Scheduled Crons",
      icon: Cpu,
      tech: "Scheduled Cron Workers • Node-RED Ingestion • 3rd-Party Sync",
      description:
        "Automated monthly/yearly invoice dispatch, time-based expiry validations, spreadsheet bulk ETL (CSV/Excel), and vendor webhook listeners.",
      metrics: "Automated Periodic Crons • Multi-Vendor Sync",
    },
    {
      id: "data",
      number: "05",
      name: "Data Tier & Cloud Storage",
      icon: Database,
      tech: "PostgreSQL • MongoDB • SQLite • PouchDB • Firebase Realtime DB",
      description:
        "ACID transactional databases, local offline mobile caches, Firebase incoming emergency event synchronization, and Azure Blob Storage SAS token attachments.",
      metrics: "SAS Token Attachments • SQLite Offline Queues",
    },
    {
      id: "infra",
      number: "06",
      name: "Cloud Hosting & Integrations",
      icon: Cloud,
      tech: "AWS (EC2 / SES) • Azure Cloud • Stripe • Shopify • QuickBooks",
      description:
        "Transactional email dispatch via AWS SES, multi-store retail balancing, and Stripe subscription tier governance.",
      metrics: "AWS / Azure Cloud • Multi-Platform Integrations",
    },
  ];

  return (
    <section id="architecture" className="py-28 px-4 sm:px-8 border-t border-border bg-background relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-mono text-accent uppercase tracking-widest font-bold">
            07 / DISTRIBUTED ARCHITECTURE
          </span>
          <span className="h-px flex-1 max-w-[80px] bg-accent/40" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-foreground uppercase tracking-tight">
              System Topology
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base font-normal mt-2 max-w-xl">
              End-to-end data pipeline from reactive frontend and offline mobile clients down to secure cloud storage and third-party integrations.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full self-start md:self-auto font-bold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>DATAFLOW ACTIVE</span>
          </div>
        </div>

        {/* Visual Multi-Tier Architecture Pipeline */}
        <div className="space-y-4 mb-16">
          {architectureTiers.map((tier, idx) => {
            const Icon = tier.icon;
            const isSelected = activeTier === tier.id;

            return (
              <div key={tier.id} className="relative">
                {/* Connecting line */}
                {idx > 0 && (
                  <div className="h-6 flex items-center justify-center -my-1">
                    <div className="w-px h-full bg-gradient-to-b from-accent/40 to-accent relative">
                      <motion.div
                        animate={{ y: [0, 20, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        className="w-1.5 h-1.5 rounded-full bg-accent -left-[2.5px] relative shadow-[0_0_8px_var(--accent)]"
                      />
                    </div>
                  </div>
                )}

                <div
                  onClick={() => setActiveTier(tier.id)}
                  className={`hud-corner p-5 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "bg-surface-elevated border-accent shadow-[0_0_30px_var(--accent-glow)]"
                      : "glass-panel border-border hover:border-accent/50 hover:bg-surface"
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-mono text-accent font-bold">
                        TIER {tier.number}
                      </span>
                      <div className="p-2.5 rounded-xl bg-surface border border-border text-foreground">
                        <Icon className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-display font-black text-foreground">
                          {tier.name}
                        </h3>
                        <p className="text-xs font-mono text-muted-foreground mt-0.5 font-semibold">
                          {tier.tech}
                        </p>
                      </div>
                    </div>

                    <div className="text-right hidden sm:block">
                      <span className="text-[11px] font-mono text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20 font-bold">
                        {tier.metrics}
                      </span>
                    </div>
                  </div>

                  {/* Expanded description on active */}
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-4 pt-4 border-t border-border text-xs sm:text-sm text-foreground/80 font-normal leading-relaxed"
                    >
                      {tier.description}
                    </motion.div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
