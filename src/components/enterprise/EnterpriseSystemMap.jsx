"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Layers,
  Database,
  Cpu,
  Workflow,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
  Zap,
  Server,
  Network,
  Activity,
  DollarSign,
  HeartPulse,
  ShoppingCart,
  Boxes,
} from "lucide-react";

const DOMAINS = [
  {
    id: "casino",
    name: "Casino RegTech & AML",
    icon: Shield,
    accent: "from-amber-500 to-red-500",
    color: "#f59e0b",
    tagline: "High-throughput patron compliance & AML-driven transaction monitoring",
    steps: [
      {
        id: "user",
        label: "Casino Patron",
        role: "Patron / Cashier",
        type: "client",
        detail: "Patron initiates $12,500 cash buy-in at high-limit gaming table.",
        tech: "React / Vue Client",
      },
      {
        id: "auth",
        label: "Identity & TIN Verify",
        role: "Compliance Check",
        type: "auth",
        detail: "External verification API validates patron identity & TIN against watchlist.",
        tech: "Third-Party REST / OAuth",
      },
      {
        id: "rules",
        label: "AML Rules Engine",
        role: "Threshold Evaluation",
        type: "rules",
        detail: "Evaluates rolling 24-hr aggregate cash-in threshold ($10,000+ FinCEN limit).",
        tech: "Node.js Rules Engine",
      },
      {
        id: "api",
        label: "Secure API Layer",
        role: "PII Masking & Token",
        type: "api",
        detail: "SSN/TIN masked in payload; generates 15-min expiring Azure Blob SAS token.",
        tech: "Express / JWT / SAS",
      },
      {
        id: "db",
        label: "PostgreSQL & Audit Vault",
        role: "Immutable Ledger",
        type: "db",
        detail: "Records encrypted transaction with patron relationship graph pointers.",
        tech: "PostgreSQL / Azure Blob",
      },
      {
        id: "ai",
        label: "CTR / SAR Case Workflow",
        role: "Compliance Review",
        type: "output",
        detail: "Generates automated CTR filing draft & flags linked proxy accounts for investigation.",
        tech: "FinCEN Workflow Engine",
      },
    ],
  },
  {
    id: "wealth",
    name: "Wealth & Asset Platform",
    icon: DollarSign,
    accent: "from-emerald-500 to-teal-500",
    color: "#10b981",
    tagline: "Encrypted multi-asset allocation, family ownership & live auction bidding",
    steps: [
      {
        id: "user",
        label: "Family Office Client",
        role: "HNW Investor",
        type: "client",
        detail: "User places live counter-bid on private equity asset in luxury marketplace.",
        tech: "React / React Native",
      },
      {
        id: "auth",
        label: "AES256 State & Auth",
        role: "Client Security",
        type: "auth",
        detail: "Redux Persist state encrypted locally with AES-256 derived from JWT session.",
        tech: "Redux / Web Crypto API",
      },
      {
        id: "rules",
        label: "Auction Business Rules",
        role: "Validation Engine",
        type: "rules",
        detail: "Verifies bidding increments, reserve thresholds, and family co-owner signing permissions.",
        tech: "Java / Node.js Engine",
      },
      {
        id: "api",
        label: "Real-Time WebSocket",
        role: "Bid Broadcast",
        type: "api",
        detail: "Sub-50ms optimistic state sync across all active auction participants.",
        tech: "WebSockets / AWS EC2",
      },
      {
        id: "db",
        label: "Financial Multi-Asset DB",
        role: "Transactional Store",
        type: "db",
        detail: "Updates multi-currency asset valuation and atomic ownership allocations.",
        tech: "PostgreSQL / Caching",
      },
      {
        id: "ai",
        label: "Portfolio Intelligence",
        role: "Analytics & Timeline",
        type: "output",
        detail: "Dynamically recalculates family net worth, risk distribution, and tax impact.",
        tech: "D3.js / Financial Models",
      },
    ],
  },
  {
    id: "healthcare",
    name: "Tele-Critical Care",
    icon: HeartPulse,
    accent: "from-blue-500 to-indigo-500",
    color: "#3b82f6",
    tagline: "Sub-150ms WebRTC consultation, ICU telemetry & AI clinical decision support",
    steps: [
      {
        id: "user",
        label: "Bedside Nurse / Doctor",
        role: "Clinical Specialist",
        type: "client",
        detail: "Bedside team detects acute patient deterioration and initiates emergency consult.",
        tech: "React Web / Native Tablet",
      },
      {
        id: "auth",
        label: "Provider Verification",
        role: "Credentialing",
        type: "auth",
        detail: "Mutual physician authentication with role-based clinical escalation privilege.",
        tech: "JWT / Verified Auth",
      },
      {
        id: "rules",
        label: "Firebase Session Lock",
        role: "Concurrency Control",
        type: "rules",
        detail: "Exclusive clinical ownership lock prevents conflicting medication/ventilator adjustments.",
        tech: "Firebase Realtime DB",
      },
      {
        id: "api",
        label: "Agora WebRTC Gateway",
        role: "Low-Latency Stream",
        type: "api",
        detail: "Encrypted HD audio/video and real-time 60fps ECG Lead II telemetry stream.",
        tech: "Agora SD-RTN / Canvas",
      },
      {
        id: "db",
        label: "HIPAA Clinical Data Store",
        role: "EMR & Vitals Store",
        type: "db",
        detail: "Continuous recording of SpO2, invasive BP, ventilator metrics, and lab history.",
        tech: "PostgreSQL / Encrypted DB",
      },
      {
        id: "ai",
        label: "AI Decision Support",
        role: "Physician Assistance",
        type: "output",
        detail: "Highlights abnormal lab trends and suggests differential options for doctor validation.",
        tech: "Clinical Assistive ML",
      },
    ],
  },
  {
    id: "pos",
    name: "Retail POS & Warehouse ERP",
    icon: ShoppingCart,
    accent: "from-purple-500 to-pink-500",
    color: "#a855f7",
    tagline: "GST billing, automated godown stock reduction & multi-tenant printing",
    steps: [
      {
        id: "user",
        label: "Retail Counter Checkout",
        role: "Store Cashier",
        type: "client",
        detail: "Scans barcode bundle for customer with mixed GST and non-taxable goods.",
        tech: "React POS Terminal",
      },
      {
        id: "auth",
        label: "Tenant & Store Auth",
        role: "Multi-Tenant Isolation",
        type: "auth",
        detail: "Validates organization branch credentials and cashier drawer shift status.",
        tech: "JWT Tenant Middleware",
      },
      {
        id: "rules",
        label: "GST & Discount Engine",
        role: "Tax Calculation",
        type: "rules",
        detail: "Applies itemized CGST/SGST/IGST tax slabs, customer loyalty, and bulk promo discounts.",
        tech: "Node.js Tax Engine",
      },
      {
        id: "api",
        label: "Transaction API",
        role: "Atomic Checkout",
        type: "api",
        detail: "Initiates ACID payment capture with row-level warehouse lock.",
        tech: "Express / REST APIs",
      },
      {
        id: "db",
        label: "Warehouse Stock Decrement",
        role: "Godown Reduction",
        type: "db",
        detail: "Automatically reduces physical inventory from central godown in real time.",
        tech: "PostgreSQL / MongoDB",
      },
      {
        id: "ai",
        label: "Multi-Format Invoicing",
        role: "Thermal / PDF Print",
        type: "output",
        detail: "Instant generation of 80mm ESC/POS thermal receipt or formal A4 GST PDF invoice.",
        tech: "Thermal & PDFKit Engine",
      },
    ],
  },
];

export default function EnterpriseSystemMap() {
  const [activeDomain, setActiveDomain] = useState(DOMAINS[0]);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const activeStep = activeDomain.steps[activeStepIndex];

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-border/40 overflow-hidden">
      {/* Background Subtle Tech Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs uppercase tracking-wider mb-4">
            <Network className="w-3.5 h-3.5" />
            <span>Signature Interactive Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-foreground">
            The Enterprise System Map
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            Explore how data flows through authentication, tenant security, business rules, databases, and intelligent decision layers across real-world business domains.
          </p>
        </div>

        {/* Domain Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {DOMAINS.map((domain) => {
            const Icon = domain.icon;
            const isSelected = domain.id === activeDomain.id;
            return (
              <button
                key={domain.id}
                onClick={() => {
                  setActiveDomain(domain);
                  setActiveStepIndex(0);
                }}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-300 border ${
                  isSelected
                    ? "bg-foreground text-background border-foreground shadow-lg shadow-foreground/10"
                    : "bg-surface/80 text-muted-foreground border-border hover:border-foreground/40 hover:text-foreground"
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? "text-background" : ""}`} />
                <span>{domain.name}</span>
              </button>
            );
          })}
        </div>

        {/* System Diagram Main Panel */}
        <div className="p-6 sm:p-8 lg:p-10 rounded-2xl bg-surface/90 border border-border/80 shadow-2xl backdrop-blur-md">
          {/* Domain Tagline */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border mb-8">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-accent font-bold">
                Active Architecture Pipeline
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mt-1">
                {activeDomain.name} Data Flow
              </h3>
              <p className="text-sm text-muted-foreground mt-0.5">{activeDomain.tagline}</p>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background border border-border text-xs font-mono text-muted-foreground">
              <Activity className="w-3.5 h-3.5 text-green-500 animate-pulse" />
              <span>Step {activeStepIndex + 1} of {activeDomain.steps.length}</span>
            </div>
          </div>

          {/* Interactive Flow Step Nodes */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-8">
            {activeDomain.steps.map((step, idx) => {
              const isActive = idx === activeStepIndex;
              const isPast = idx < activeStepIndex;

              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`relative p-4 rounded-xl text-left transition-all duration-300 border ${
                    isActive
                      ? "bg-accent/10 border-accent shadow-md shadow-accent/10"
                      : isPast
                      ? "bg-surface border-border/60 text-foreground"
                      : "bg-background/50 border-border/40 text-muted-foreground hover:border-border hover:text-foreground"
                  }`}
                >
                  {/* Step Number Badge */}
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        isActive
                          ? "bg-accent text-white"
                          : isPast
                          ? "bg-foreground/10 text-foreground"
                          : "bg-border text-muted-foreground"
                      }`}
                    >
                      0{idx + 1}
                    </span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
                    )}
                  </div>

                  <div className="text-xs font-bold text-foreground truncate">
                    {step.label}
                  </div>
                  <div className="text-[11px] text-muted-foreground truncate mt-0.5">
                    {step.role}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Node Detail Inspector */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeDomain.id}-${activeStep.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="p-6 rounded-xl bg-background border border-border/80 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center"
            >
              <div className="lg:col-span-2 space-y-3">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-accent/10 text-accent font-mono text-xs font-semibold">
                  <Workflow className="w-3.5 h-3.5" />
                  <span>{activeStep.role}</span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-foreground">
                  {activeStep.label}
                </h4>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {activeStep.detail}
                </p>
                <div className="flex items-center gap-2 pt-2 text-xs font-mono text-muted-foreground">
                  <Cpu className="w-3.5 h-3.5 text-accent" />
                  <span>Technology Stack:</span>
                  <span className="font-semibold text-foreground bg-surface px-2 py-0.5 rounded border border-border">
                    {activeStep.tech}
                  </span>
                </div>
              </div>

              {/* Step Navigation Controls */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-end items-stretch lg:items-end">
                <button
                  onClick={() =>
                    setActiveStepIndex((prev) =>
                      prev < activeDomain.steps.length - 1 ? prev + 1 : 0
                    )
                  }
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-accent text-white font-medium text-sm hover:bg-accent/90 transition-all shadow-md shadow-accent/20"
                >
                  <span>
                    {activeStepIndex === activeDomain.steps.length - 1
                      ? "Restart Pipeline"
                      : "Next Pipeline Node"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="text-[11px] font-mono text-muted-foreground text-center lg:text-right">
                  Interactive node inspection enabled
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
