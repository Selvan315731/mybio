"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
  Server,
  Smartphone,
  Layers,
  Database,
  Cloud,
  ArrowRight,
  Workflow,
} from "lucide-react";
import skillsData from "@/data/skills.json";

export default function TechEcosystem() {
  const [activeCategory, setActiveCategory] = useState("frontend");
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const categoryIcons = {
    frontend: Code,
    mobile: Smartphone,
    backend: Server,
    databases: Database,
    cloud: Cloud,
    tools: Workflow,
  };

  const currentCategoryData = skillsData.categories.find(
    (c) => c.id === activeCategory
  ) || skillsData.categories[0];

  const isSkillConnected = (skillName) => {
    if (!hoveredSkill) return false;
    if (hoveredSkill.name === skillName) return true;
    return (
      hoveredSkill.related?.includes(skillName) ||
      skillsData.ecosystemConnections.some(
        (conn) =>
          (conn.from === hoveredSkill.name && conn.to === skillName) ||
          (conn.to === hoveredSkill.name && conn.from === skillName)
      )
    );
  };

  return (
    <section id="stack" className="py-28 px-4 sm:px-8 border-t border-border bg-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-mono text-accent uppercase tracking-widest font-bold">
            02 / TECH MATRIX & NODES
          </span>
          <span className="h-px flex-1 max-w-[80px] bg-accent/40" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-foreground uppercase tracking-tight">
              Full-Stack Ecosystem
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base font-normal mt-2 max-w-xl">
              An interconnected matrix of specialized runtimes, reactive UI systems, high-concurrency microservices, and persistent database layers.
            </p>
          </div>

          <div className="text-xs font-mono text-muted-foreground bg-surface px-4 py-2 rounded-xl border border-border self-start md:self-auto shadow-sm">
            <span className="text-accent font-bold">TIP:</span> Hover any node to highlight linked stack relationships
          </div>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 p-1.5 rounded-2xl glass-panel border border-border">
          {skillsData.categories.map((cat) => {
            const Icon = categoryIcons[cat.id] || Layers;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setHoveredSkill(null);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-300 relative ${
                  isActive
                    ? "text-foreground font-bold"
                    : "text-muted-foreground hover:text-foreground hover:bg-surface"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    className="absolute inset-0 bg-accent/15 border border-accent/40 rounded-xl shadow-[0_0_12px_var(--accent-glow)]"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-accent" : ""}`} />
                <span>{cat.name.split(" ")[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Interactive Ecosystem Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Active Skills Interactive List */}
          <div className="lg:col-span-7 space-y-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                {currentCategoryData.skills.map((skill, idx) => {
                  const isHovered = hoveredSkill?.name === skill.name;
                  const isConnected = isSkillConnected(skill.name);

                  return (
                    <motion.div
                      key={skill.name}
                      onMouseEnter={() => setHoveredSkill(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`group hud-corner p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                        isHovered
                          ? "bg-accent/15 border-accent shadow-[0_0_25px_var(--accent-glow)]"
                          : isConnected
                          ? "bg-surface-elevated border-accent/60 shadow-[0_0_15px_var(--accent-glow)]"
                          : "glass-panel border-border hover:border-accent/40"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2.5">
                          <span className="text-sm sm:text-base font-display font-bold text-foreground group-hover:text-accent transition-colors">
                            {skill.name}
                          </span>
                          {skill.highlight && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-accent/20 text-accent border border-accent/30 font-bold">
                              CORE
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-mono text-muted-foreground uppercase font-semibold">
                          {skill.level}
                        </span>
                      </div>

                      <p className="text-xs text-foreground/80 font-normal leading-relaxed mb-3">
                        {skill.desc}
                      </p>

                      {/* Related linked tags */}
                      {skill.related && skill.related.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-border">
                          <span className="text-[10px] font-mono text-muted-foreground mr-1">
                            Linkages:
                          </span>
                          {skill.related.map((rel) => (
                            <span
                              key={rel}
                              className={`text-[10px] font-mono px-2 py-0.5 rounded transition-colors ${
                                hoveredSkill?.name === rel
                                  ? "bg-accent text-white"
                                  : "bg-surface border border-border text-foreground/80"
                              }`}
                            >
                              {rel}
                            </span>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Relationship & Architectural Connectivity Inspector */}
          <div className="lg:col-span-5 hud-corner glass-panel-elevated p-6 sm:p-8 rounded-2xl border border-border sticky top-24 shadow-lg">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Workflow className="w-4 h-4 text-accent" />
                <span className="text-xs font-mono uppercase tracking-wider text-foreground font-bold">
                  Node Inspector
                </span>
              </div>
              <span className="text-[11px] font-mono text-muted-foreground">
                {hoveredSkill ? "Active" : "Matrix Map"}
              </span>
            </div>

            {hoveredSkill ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-5"
              >
                <div>
                  <span className="text-[10px] font-mono text-accent uppercase tracking-wider font-bold">
                    [ SELECTED NODE ]
                  </span>
                  <h3 className="text-2xl font-display font-black text-foreground mt-1">
                    {hoveredSkill.name}
                  </h3>
                  <p className="text-xs text-foreground/80 mt-1 leading-relaxed">
                    {hoveredSkill.desc}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-border">
                  <span className="text-xs font-mono text-accent uppercase tracking-wider block font-bold">
                    Direct Connections
                  </span>
                  <div className="space-y-2">
                    {skillsData.ecosystemConnections
                      .filter(
                        (c) =>
                          c.from === hoveredSkill.name || c.to === hoveredSkill.name
                      )
                      .map((conn, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-surface border border-border flex items-center justify-between text-xs font-mono"
                        >
                          <div className="flex items-center gap-1.5 text-foreground">
                            <span className="font-bold">{conn.from}</span>
                            <ArrowRight className="w-3 h-3 text-accent" />
                            <span className="text-accent font-bold">{conn.to}</span>
                          </div>
                          <span className="text-[10px] text-muted-foreground">
                            {conn.label}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="space-y-4 text-xs font-mono text-muted-foreground">
                <p className="leading-relaxed">
                  Hover over any technology node in the matrix to inspect its live relational pathways, microservice connections, and client-server bindings.
                </p>

                <div className="space-y-2 pt-2">
                  <span className="text-[11px] text-foreground uppercase tracking-wider font-bold block">
                    Core Architectural Pathways
                  </span>
                  {skillsData.ecosystemConnections.slice(0, 4).map((conn, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-surface border border-border flex items-center justify-between text-[11px]"
                    >
                      <div className="flex items-center gap-1.5 text-foreground">
                        <span className="font-semibold">{conn.from}</span>
                        <ArrowRight className="w-3 h-3 text-accent" />
                        <span className="font-semibold">{conn.to}</span>
                      </div>
                      <span className="text-[10px] text-muted-foreground">
                        {conn.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
