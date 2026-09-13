"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Building2, HeartPulse, Dices, Package, Briefcase, DollarSign } from "lucide-react";
import domainsData from "@/data/domains.json";
import projectsData from "@/data/projects.json";

export default function DomainExpertise() {
  const [selectedDomainId, setSelectedDomainId] = useState(domainsData[0].id);

  const selectedDomain =
    domainsData.find((d) => d.id === selectedDomainId) || domainsData[0];

  const relatedProject = projectsData.find(
    (p) => p.id === selectedDomain.relatedProjectId || p.slug === selectedDomain.relatedProjectId
  );

  const domainIcons = {
    casino: Dices,
    healthcare: HeartPulse,
    wealth: DollarSign,
    therapy: HeartPulse,
    inventory: Package,
    enterprise: Briefcase,
  };

  return (
    <section className="py-28 px-4 sm:px-8 border-t border-border bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-mono text-accent uppercase tracking-widest font-bold">
            05 / DOMAIN EXPERTISE & VERTICALS
          </span>
          <span className="h-px flex-1 max-w-[80px] bg-accent/40" />
        </div>

        <div className="mb-14">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-foreground uppercase tracking-tight">
            Industry Verticals
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base font-normal mt-2 max-w-2xl">
            Engineering solutions designed around specialized domain regulations, transactional constraints, and real-time performance profiles.
          </p>
        </div>

        {/* 2-Column Split: Domain Selector on Left, Deep Dive Details on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Domain Vertical List */}
          <div className="lg:col-span-5 space-y-2.5">
            {domainsData.map((domain) => {
              const isSelected = selectedDomainId === domain.id;
              const Icon = domainIcons[domain.id] || Building2;

              return (
                <button
                  key={domain.id}
                  onClick={() => setSelectedDomainId(domain.id)}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-300 flex items-center justify-between group border relative ${
                    isSelected
                      ? "bg-surface-elevated border-accent shadow-[0_0_20px_var(--accent-glow)]"
                      : "glass-panel border-border hover:border-accent/50 hover:bg-surface"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-muted-foreground group-hover:text-accent font-bold transition-colors">
                      {domain.number}
                    </span>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isSelected ? "bg-accent/20 text-accent" : "bg-surface text-muted-foreground"}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-base font-display font-bold text-foreground">
                        {domain.title}
                      </span>
                    </div>
                  </div>

                  <ArrowUpRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected
                        ? "text-accent translate-x-0.5 -translate-y-0.5"
                        : "text-muted-foreground/40 group-hover:text-foreground"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Domain Narrative & Architectural Capabilities */}
          <div className="lg:col-span-7 hud-corner glass-panel-elevated p-6 sm:p-10 rounded-2xl border border-border relative shadow-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedDomain.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase tracking-widest font-bold">
                    <span>SECTOR SPECIFICATION</span>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">
                    {selectedDomain.stats}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-display font-black text-foreground mb-2">
                    {selectedDomain.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-accent mb-3 font-semibold">
                    {selectedDomain.tagline}
                  </p>
                  <p className="text-sm text-foreground/80 font-normal leading-relaxed">
                    {selectedDomain.description}
                  </p>
                </div>

                {/* Key Capabilities */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-bold block">
                    Core Technical Implementations
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedDomain.keyCapabilities.map((cap, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-surface border border-border flex items-start gap-2.5 text-xs font-mono text-foreground"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Linked Featured Project Pill */}
                {relatedProject && (
                  <div className="pt-4 border-t border-border">
                    <span className="text-[11px] font-mono text-muted-foreground uppercase block mb-2 font-semibold">
                      Demonstrated Production Case Study:
                    </span>
                    <Link
                      href={`/work/${relatedProject.slug}`}
                      className="p-4 rounded-xl bg-surface border border-border hover:border-accent flex items-center justify-between group transition-all"
                    >
                      <div className="space-y-1">
                        <div className="text-sm font-display font-bold text-foreground group-hover:text-accent transition-colors">
                          {relatedProject.title}
                        </div>
                        <div className="text-xs font-mono text-muted-foreground truncate max-w-md">
                          {relatedProject.tagline}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-mono text-accent font-bold shrink-0">
                        <span>VIEW STUDY</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </Link>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
