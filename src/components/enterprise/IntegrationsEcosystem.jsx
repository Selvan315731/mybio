"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Share2,
  DollarSign,
  ShieldCheck,
  ShoppingCart,
  Video,
  Cloud,
  Key,
  CheckCircle2,
} from "lucide-react";

const INTEGRATION_CATEGORIES = [
  {
    id: "financial",
    name: "Financial & Billing",
    icon: DollarSign,
    description: "Payment gateways, accounting ledgers, and automated recurring billing.",
    integrations: [
      { name: "Stripe API", detail: "Tiered subscription billing & webhook checkout processing" },
      { name: "QuickBooks Online", detail: "Bi-directional journal synchronization & invoice matching" },
      { name: "Multi-Currency Engine", detail: "Real-time exchange rate valuation & asset conversions" },
    ],
  },
  {
    id: "compliance",
    name: "Compliance & RegTech",
    icon: ShieldCheck,
    description: "Identity validation, TIN verification, and regulatory reporting pipelines.",
    integrations: [
      { name: "External TIN / ID Verifier", detail: "Real-time patron verification against compliance watchlists" },
      { name: "FinCEN Workflow Engine", detail: "Automated CTR and SAR draft generation & audit trails" },
      { name: "PII Masking Gateway", detail: "Dynamic redaction of SSN/TIN across REST API responses" },
    ],
  },
  {
    id: "retail",
    name: "Retail & Supply Chain",
    icon: ShoppingCart,
    description: "Multi-channel e-commerce, POS terminals, and warehouse synchronization.",
    integrations: [
      { name: "Shopify REST / Webhooks", detail: "Real-time catalog and online sales inventory deduction" },
      { name: "Greenbits POS API", detail: "Physical point-of-sale register synchronization" },
      { name: "ESC/POS Thermal & PDFKit", detail: "80mm thermal receipt printing and A4 tax invoice generation" },
    ],
  },
  {
    id: "communication",
    name: "Real-Time Communication",
    icon: Video,
    description: "Low-latency audio/video conferencing and live telemetry state channels.",
    integrations: [
      { name: "Agora WebRTC SD-RTN", detail: "Sub-150ms HD provider-to-provider video & audio streaming" },
      { name: "Firebase Realtime DB", detail: "Active session locking and clinical whiteboard state sync" },
      { name: "WebSockets / Canvas", detail: "60fps real-time ECG Lead II patient telemetry rendering" },
    ],
  },
  {
    id: "cloud",
    name: "Cloud & Storage",
    icon: Cloud,
    description: "Encrypted document vaults, ephemeral tokens, and microservice hosts.",
    integrations: [
      { name: "Azure Blob Storage", detail: "Encrypted compliance document storage with 15-min SAS tokens" },
      { name: "AWS EC2 & RDS", detail: "High-throughput Node.js microservices and managed PostgreSQL" },
      { name: "SQLite / PouchDB", detail: "Offline-first mobile database with conflict-free delta sync" },
    ],
  },
  {
    id: "auth",
    name: "Auth & Identity",
    icon: Key,
    description: "Zero-trust token authorization and enterprise single sign-on.",
    integrations: [
      { name: "JWT & Role Middleware", detail: "Tenant-isolated claims validation and endpoint protection" },
      { name: "Microsoft OAuth SSO", detail: "Corporate Active Directory enterprise login integration" },
      { name: "AES-256 Crypto API", detail: "Client-side encrypted Redux persist state management" },
    ],
  },
];

export default function IntegrationsEcosystem() {
  const [activeCategory, setActiveCategory] = useState(INTEGRATION_CATEGORIES[0]);

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-border/40 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs uppercase tracking-wider mb-4">
            <Share2 className="w-3.5 h-3.5" />
            <span>Third-Party & Hardware Connectors</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-foreground">
            Enterprise Integrations Ecosystem
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            Seamlessly bridging enterprise systems with payment gateways, regulatory verification APIs, e-commerce webhooks, WebRTC communication channels, and cloud storage.
          </p>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INTEGRATION_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className="p-6 rounded-2xl bg-surface/90 border border-border/80 shadow-lg backdrop-blur-md space-y-4 hover:border-foreground/30 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-accent/10 border border-accent/20 text-accent">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-2.5 pt-2 border-t border-border/60">
                  {cat.integrations.map((item) => (
                    <div
                      key={item.name}
                      className="p-3 rounded-xl bg-background border border-border/80 text-xs space-y-1"
                    >
                      <div className="font-bold text-foreground flex items-center justify-between">
                        <span>{item.name}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                      </div>
                      <div className="text-[11px] text-muted-foreground">
                        {item.detail}
                      </div>
                    </div>
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
