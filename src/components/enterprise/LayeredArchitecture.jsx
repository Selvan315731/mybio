"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  Layout,
  Terminal,
  Cpu,
  Database,
  Share2,
  Cloud,
  ChevronRight,
} from "lucide-react";

const ARCHITECTURE_LAYERS = [
  {
    id: "experience",
    name: "01. Experience Layer",
    icon: Layout,
    subtitle: "Client Interfaces & Cross-Platform UI",
    tech: ["React.js", "Next.js", "React Native", "Vue.js", "Tailwind CSS"],
    description: "Responsive, accessible, and high-performance interfaces across web, iOS, and Android with optimistic UI states and smooth micro-interactions.",
  },
  {
    id: "application",
    name: "02. Application Layer",
    icon: Layers,
    subtitle: "Component Systems & Client State",
    tech: ["Dynamic Forms", "HOC Architecture", "Redux Persist (AES-256)", "Schema Validation"],
    description: "Metadata-driven form builders, client-side encryption caches, offline queues, and modular UI component libraries.",
  },
  {
    id: "api",
    name: "03. API & Gateway Layer",
    icon: Terminal,
    subtitle: "REST Services & Secure Auth",
    tech: ["Node.js", "Express.js", "REST APIs", "JWT Authentication", "Tenant Middleware"],
    description: "High-throughput API endpoints with rate-limiting, tenant isolation middleware, request validation, and token authentication.",
  },
  {
    id: "business",
    name: "04. Business & Rules Layer",
    icon: Cpu,
    subtitle: "Workflows & Regulatory Logic",
    tech: ["AML Rules Engine", "GST Tax Calculator", "CTR/SAR Workflows", "Auction Engine"],
    description: "Decoupled business logic engines that evaluate dynamic parameters, regulatory thresholds, and multi-signature approvals.",
  },
  {
    id: "data",
    name: "05. Data Persistence Layer",
    icon: Database,
    subtitle: "Relational, Document & Offline Stores",
    tech: ["PostgreSQL (PII Masking)", "MongoDB", "SQLite (Mobile Sync)", "PouchDB"],
    description: "ACID-compliant relational schemas, indexed document collections, and encrypted offline-first mobile databases.",
  },
  {
    id: "integration",
    name: "06. Integration Ecosystem",
    icon: Share2,
    subtitle: "Third-Party & Hardware Connectors",
    tech: ["Shopify Webhooks", "QuickBooks", "Greenbits", "Agora WebRTC", "Stripe API"],
    description: "Bi-directional ETL synchronization pipelines, hardware POS thermal printers, and real-time audio/video WebRTC gateways.",
  },
  {
    id: "infrastructure",
    name: "07. Cloud & Infrastructure Layer",
    icon: Cloud,
    subtitle: "Deployment & Managed Cloud Services",
    tech: ["AWS EC2", "Azure Blob & SAS Tokens", "Firebase Realtime DB", "Docker"],
    description: "Scalable cloud infrastructure with automated backups, short-lived storage access tokens, and low-latency real-time synchronization.",
  },
];

export default function LayeredArchitecture() {
  const [activeLayerIndex, setActiveLayerIndex] = useState(0);
  const activeLayer = ARCHITECTURE_LAYERS[activeLayerIndex];

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-border/40 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>Architectural Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-foreground">
            How I Build Enterprise Applications
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            A decoupled 7-tier architecture engineered for enterprise scalability, regulatory compliance, and seamless cross-platform experiences.
          </p>
        </div>

        {/* Layered Stack Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Stack Selector */}
          <div className="lg:col-span-6 space-y-2.5">
            {ARCHITECTURE_LAYERS.map((layer, idx) => {
              const Icon = layer.icon;
              const isActive = idx === activeLayerIndex;

              return (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayerIndex(idx)}
                  className={`w-full p-3.5 sm:p-4 rounded-xl text-left border transition-all duration-200 flex items-center justify-between ${
                    isActive
                      ? "bg-foreground text-background border-foreground shadow-lg"
                      : "bg-surface/80 text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? "text-background" : "text-accent"}`} />
                    <div>
                      <div className="text-xs sm:text-sm font-bold truncate">
                        {layer.name}
                      </div>
                      <div className={`text-[11px] truncate ${isActive ? "text-background/80" : "text-muted-foreground"}`}>
                        {layer.subtitle}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 ${isActive ? "text-background" : "text-muted-foreground"}`} />
                </button>
              );
            })}
          </div>

          {/* Right Column: Layer Deep-Dive Card */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-surface/90 border border-border/80 shadow-2xl backdrop-blur-md space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <span className="px-2.5 py-1 rounded bg-accent/10 text-accent font-mono text-xs font-bold">
                Tier Inspector
              </span>
              <span className="text-xs font-mono text-muted-foreground">
                Layer {activeLayerIndex + 1} of 7
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-foreground">
                {activeLayer.name}
              </h3>
              <p className="text-sm text-accent font-mono mt-0.5">
                {activeLayer.subtitle}
              </p>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {activeLayer.description}
            </p>

            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-foreground font-bold mb-3">
                Core Technologies & Patterns:
              </div>
              <div className="flex flex-wrap gap-2">
                {activeLayer.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 rounded-lg bg-background border border-border text-xs font-mono text-foreground font-semibold"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
