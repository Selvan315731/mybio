"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { CheckCircle2, Layers } from "lucide-react";
import profileData from "@/data/profile.json";

export default function About() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const { about } = profileData;

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-28 px-4 sm:px-8 border-t border-border bg-background overflow-hidden"
    >
      {/* Background ambient glow */}
      <motion.div
        style={{ y: yBackground }}
        className="pointer-events-none absolute top-1/3 left-0 w-96 h-96 rounded-full bg-accent/10 blur-[130px]"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header Tag */}
        <div className="flex items-center gap-3 mb-8">
          <span className="text-xs font-mono text-accent uppercase tracking-widest font-bold">
            01 / PERSPECTIVE & CRAFT
          </span>
          <span className="h-px flex-1 max-w-[80px] bg-accent/40" />
        </div>

        {/* Large Headline */}
        <div className="mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-foreground tracking-tight uppercase leading-[1.1]"
          >
            {about.title}
          </motion.h2>
        </div>

        {/* 2-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-12">
          {/* Left Column: Narrative paragraphs */}
          <div className="lg:col-span-7 space-y-6 text-foreground/80 text-base sm:text-lg leading-relaxed font-normal">
            {about.paragraphs.map((para, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + idx * 0.15 }}
                className={idx === 0 ? "text-xl sm:text-2xl text-foreground font-semibold" : ""}
              >
                {para}
              </motion.p>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="pt-4 flex flex-wrap gap-2.5"
            >
              {[
                "Metadata-Driven UI",
                "AES256 Encrypted Stores",
                "Offline-First SQLite Sync",
                "Agora WebRTC Telemedicine",
                "Azure Blob SAS Security",
              ].map((pill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-panel border border-border text-xs font-mono text-foreground/80"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                  {pill}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Architectural Highlights Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-5 hud-corner glass-panel-elevated p-8 rounded-2xl border border-border relative overflow-hidden"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-accent/15 border border-accent/30 text-accent">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-mono uppercase tracking-wider text-foreground font-bold">
                  Core Runtime Footprint
                </h3>
                <p className="text-xs text-muted-foreground font-mono">
                  Full Stack Architecture
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-surface border border-border">
                <div className="text-foreground font-bold flex justify-between mb-1">
                  <span>WEB & REAL-TIME</span>
                  <span className="text-accent font-bold">AGORA / FIREBASE</span>
                </div>
                <div className="text-muted-foreground text-[11px] leading-relaxed">
                  ReactJS, Next.js, Agora WebRTC video streaming, Firebase Realtime Database, Material UI theme systems.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface border border-border">
                <div className="text-foreground font-bold flex justify-between mb-1">
                  <span>MOBILE & OFFLINE</span>
                  <span className="text-emerald-500 font-bold">SQLITE SYNC</span>
                </div>
                <div className="text-muted-foreground text-[11px] leading-relaxed">
                  React Native Android & iOS with 1-to-N duration timers, local SQLite delta persistence, and native mobile bridges.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface border border-border">
                <div className="text-foreground font-bold flex justify-between mb-1">
                  <span>BACKEND & SECURITY</span>
                  <span className="text-accent font-bold">RBAC & SAS BLOBS</span>
                </div>
                <div className="text-muted-foreground text-[11px] leading-relaxed">
                  Node.js & Express REST microservices, PostgreSQL, Azure Blob Storage with SAS tokens, and sensitive data masking.
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
