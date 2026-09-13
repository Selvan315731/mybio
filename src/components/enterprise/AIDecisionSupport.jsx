"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Sparkles,
  ShieldAlert,
  UserCheck,
  CheckCircle,
  ArrowRight,
  Database,
  FileSearch,
  Stethoscope,
  Coins,
} from "lucide-react";

const AI_SCENARIOS = [
  {
    id: "casino",
    title: "Casino AML & Pattern Detection",
    domain: "RegTech Compliance",
    icon: Coins,
    rawInput: "Patron conducts 4 separate $2,800 cash buy-ins at 3 distinct roulette tables within 45 minutes.",
    rulesOutput: "Triggers FinCEN structuring heuristics (Aggregate: $11,200 > $10,000 threshold).",
    aiInsight: "Identifies rapid table movement pattern correlating with 2 linked proxy accounts detected last month.",
    humanAction: "Compliance Officer evaluates flagged graph linkages and approves filing of Suspicious Activity Report (SAR).",
    disclaimer: "AI highlights behavioral clusters and risk signals; the human compliance officer determines filing actions.",
  },
  {
    id: "healthcare",
    title: "Clinical Lab & Telemetry Analysis",
    domain: "Healthcare Telemedicine",
    icon: Stethoscope,
    rawInput: "Patient telemetry logs acute SpO2 drop to 88% concurrent with 140 BPM resting tachycardia and elevated troponin levels.",
    rulesOutput: "Immediate high-priority clinical threshold alert dispatched to intensivist queue.",
    aiInsight: "Cross-references 12-month patient chart to highlight prior ischemic episodes and suggests acute coronary evaluation.",
    humanAction: "Attending intensivist verifies lab deltas, conducts live WebRTC video consultation, and orders urgent intervention.",
    disclaimer: "AI provides decision-support suggestions based on chart data; the licensed physician maintains sole clinical authority.",
  },
];

export default function AIDecisionSupport() {
  const [activeScenario, setActiveScenario] = useState(AI_SCENARIOS[0]);

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-border/40 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs uppercase tracking-wider mb-4">
            <Brain className="w-3.5 h-3.5" />
            <span>Intelligent Decision Support</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-foreground">
            From Data to Decision Support
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            I integrate AI as an assistive layer—processing raw data, running deterministic rules, detecting subtle risk patterns, and empowering human practitioners to make informed decisions.
          </p>
        </div>

        {/* Scenario Switcher */}
        <div className="flex justify-center gap-3 mb-10">
          {AI_SCENARIOS.map((sc) => {
            const Icon = sc.icon;
            const isSelected = sc.id === activeScenario.id;
            return (
              <button
                key={sc.id}
                onClick={() => setActiveScenario(sc)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium border transition-all ${
                  isSelected
                    ? "bg-foreground text-background border-foreground font-bold shadow-lg"
                    : "bg-surface text-muted-foreground border-border hover:text-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{sc.title}</span>
              </button>
            );
          })}
        </div>

        {/* AI Pipeline Visual Card */}
        <div className="p-6 sm:p-8 lg:p-10 rounded-2xl bg-surface/90 border border-border/80 shadow-2xl backdrop-blur-md">
          {/* Pipeline Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {/* Step 1: Raw Ingestion */}
            <div className="p-4 rounded-xl bg-background border border-border/80 space-y-2">
              <div className="flex items-center gap-2 font-mono text-[11px] font-bold text-muted-foreground">
                <Database className="w-3.5 h-3.5 text-accent" />
                <span>01. RAW TELEMETRY / DATA</span>
              </div>
              <p className="text-xs text-foreground leading-relaxed">
                {activeScenario.rawInput}
              </p>
            </div>

            {/* Step 2: Rules Engine */}
            <div className="p-4 rounded-xl bg-background border border-border/80 space-y-2">
              <div className="flex items-center gap-2 font-mono text-[11px] font-bold text-amber-500">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>02. DETERMINISTIC RULES</span>
              </div>
              <p className="text-xs text-foreground leading-relaxed">
                {activeScenario.rulesOutput}
              </p>
            </div>

            {/* Step 3: AI Assistive Layer */}
            <div className="p-4 rounded-xl bg-accent/5 border border-accent/30 space-y-2">
              <div className="flex items-center gap-2 font-mono text-[11px] font-bold text-accent">
                <Sparkles className="w-3.5 h-3.5" />
                <span>03. AI ASSISTIVE INSIGHT</span>
              </div>
              <p className="text-xs text-foreground leading-relaxed">
                {activeScenario.aiInsight}
              </p>
            </div>

            {/* Step 4: Human Decision */}
            <div className="p-4 rounded-xl bg-background border border-green-500/30 space-y-2">
              <div className="flex items-center gap-2 font-mono text-[11px] font-bold text-green-500">
                <UserCheck className="w-3.5 h-3.5" />
                <span>04. HUMAN PRACTITIONER</span>
              </div>
              <p className="text-xs text-foreground leading-relaxed">
                {activeScenario.humanAction}
              </p>
            </div>
          </div>

          {/* Regulatory & Ethical AI Governance Notice */}
          <div className="p-4 rounded-xl bg-background border border-border/80 flex items-center gap-3 text-xs text-muted-foreground">
            <CheckCircle className="w-4 h-4 text-accent shrink-0" />
            <span>
              <strong className="text-foreground">Governance Principle:</strong> {activeScenario.disclaimer}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
