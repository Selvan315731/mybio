"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Code2,
  Database,
  Smartphone,
  Server,
  ChevronRight,
  Sparkles,
  Layers,
  ShieldCheck,
  Share2,
  Brain,
  ArrowDown,
  Terminal,
} from "lucide-react";
import profileData from "@/data/profile.json";

const TECH_BADGES = [
  "React.js",
  "React Native",
  "Vue.js",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "MongoDB",
  "AWS",
  "Azure",
  "Firebase",
];

const SYSTEM_NODES = [
  { id: "frontend", label: "Frontend Architecture", sub: "React / React Native / Vue", icon: Layers },
  { id: "api", label: "API Gateway", sub: "Node.js / Express / REST", icon: Terminal },
  { id: "rules", label: "Business Rules", sub: "AML / GST / Validation", icon: ShieldCheck },
  { id: "db", label: "Database Layer", sub: "PostgreSQL / SQLite / Mongo", icon: Database },
  { id: "integrations", label: "Third-Party Connectors", sub: "Shopify / Agora / Azure SAS", icon: Share2 },
  { id: "ai", label: "Analytics & AI", sub: "Pattern Analysis & Decision", icon: Brain },
];

export default function Hero() {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredNode, setHoveredNode] = useState(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.96]);
  const y = useTransform(scrollYProgress, [0, 0.8], [0, 60]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      setMousePosition({
        x: (clientX / innerWidth - 0.5) * 30,
        y: (clientY / innerHeight - 0.5) * 30,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleScrollDown = () => {
    const target = document.getElementById("projects");
    if (target) {
      if (window.__lenis) {
        window.__lenis.scrollTo(target, { offset: -60 });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-4 sm:px-8 overflow-hidden bg-manga-dots"
    >
      {/* Ambient Lighting Gradients */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-accent/15 blur-[140px] transition-transform duration-700 ease-out z-0"
        style={{
          transform: `translate(calc(-50% + ${mousePosition.x}px), ${mousePosition.y}px)`,
        }}
      />
      <div
        className="pointer-events-none absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[130px] transition-transform duration-700 ease-out z-0"
        style={{
          transform: `translate(${-mousePosition.x * 0.8}px, ${-mousePosition.y * 0.8}px)`,
        }}
      />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none z-0" />

      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 max-w-6xl mx-auto w-full flex flex-col items-center text-center"
      >
        {/* Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-surface/90 border border-border text-xs font-mono tracking-widest text-muted-foreground uppercase mb-6 shadow-sm backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
          <span className="text-foreground font-semibold">{profileData.name}</span>
          <span className="text-muted-foreground">•</span>
          <span className="text-accent font-bold">ENTERPRISE FULL-STACK ARCHITECT</span>
        </motion.div>

        {/* Primary Headline */}
        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.2,
            }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight text-foreground leading-[1.08] text-balance"
          >
            I Build Complex Systems. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent">
              I Make Them Feel Simple.
            </span>
          </motion.h1>
        </div>

        {/* Supporting Statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-base sm:text-lg md:text-xl font-sans text-muted-foreground max-w-3xl leading-relaxed mb-8 text-balance"
        >
          {profileData.heroSubheading}
        </motion.p>

        {/* Technology Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mb-10"
        >
          {TECH_BADGES.map((badge) => (
            <span
              key={badge}
              className="px-3 py-1 rounded-lg bg-surface/80 border border-border text-xs font-mono font-medium text-foreground hover:border-accent hover:text-accent transition-colors backdrop-blur-sm"
            >
              {badge}
            </span>
          ))}
        </motion.div>

        {/* Action CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-14"
        >
          <a
            href="#projects"
            className="px-8 py-3.5 rounded-xl bg-accent text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-accent/90 transition-all duration-300 shadow-[0_0_30px_var(--accent-glow)] flex items-center gap-2 group"
          >
            <span>EXPLORE PROJECTS</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#stack"
            className="px-8 py-3.5 rounded-xl bg-surface/90 border border-border text-foreground font-mono text-xs font-bold uppercase tracking-wider hover:border-accent hover:text-accent transition-all duration-300 flex items-center gap-2 backdrop-blur-sm"
          >
            <span>VIEW TECHNICAL STACK</span>
          </a>
        </motion.div>

        {/* Interactive Interconnected Enterprise Systems Visual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="w-full max-w-5xl p-6 sm:p-8 rounded-2xl bg-surface/90 border border-border/80 shadow-2xl backdrop-blur-md text-left"
        >
          <div className="flex items-center justify-between pb-4 border-b border-border mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-wider font-bold text-foreground">
                End-to-End Enterprise Architecture Flow
              </span>
            </div>
            <span className="text-[11px] font-mono text-muted-foreground hidden sm:block">
              Hover node to trace execution pathway
            </span>
          </div>

          {/* Connected Node Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {SYSTEM_NODES.map((node, idx) => {
              const Icon = node.icon;
              const isHovered = hoveredNode === node.id;

              return (
                <div
                  key={node.id}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className={`relative p-3.5 rounded-xl border transition-all duration-300 flex flex-col justify-between ${
                    isHovered
                      ? "bg-accent/10 border-accent shadow-lg shadow-accent/10"
                      : "bg-background/80 border-border/80 hover:border-foreground/30"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Icon className={`w-4 h-4 ${isHovered ? "text-accent" : "text-muted-foreground"}`} />
                      <span className="text-[10px] font-mono text-muted-foreground">0{idx + 1}</span>
                    </div>
                    <div className="text-xs font-bold text-foreground truncate">
                      {node.label}
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-muted-foreground truncate mt-2">
                    {node.sub}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.button
        onClick={handleScrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        aria-label="Scroll to content"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-muted-foreground hover:text-accent transition-colors cursor-pointer group z-10"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase font-bold">
          SCROLL TO EXPLORE
        </span>
        <div className="w-4 h-7 rounded-full border border-border flex items-start justify-center p-1 group-hover:border-accent transition-colors">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-1 h-1.5 rounded-full bg-accent"
          />
        </div>
      </motion.button>
    </section>
  );
}
