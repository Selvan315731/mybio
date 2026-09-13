"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Calendar, MapPin, CheckCircle2 } from "lucide-react";
import experienceData from "@/data/experience.json";

export default function ExperienceTimeline() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section id="experience" ref={containerRef} className="py-28 px-4 sm:px-8 border-t border-border bg-background relative">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-mono text-accent uppercase tracking-widest font-bold">
            06 / CAREER MILESTONES & IMPACT
          </span>
          <span className="h-px flex-1 max-w-[80px] bg-accent/40" />
        </div>

        <div className="mb-16">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-foreground uppercase tracking-tight">
            Production Track Record
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base font-normal mt-2 max-w-xl">
            6+ years delivering enterprise architectures, high-availability RESTful microservices, and offline-first mobile applications.
          </p>
        </div>

        {/* Timeline List */}
        <div className="relative pl-6 sm:pl-10 space-y-12">
          {/* Animated Vertical Line */}
          <div className="absolute left-0 top-3 bottom-3 w-px bg-border">
            <motion.div
              style={{ scaleY, originY: 0 }}
              className="absolute top-0 left-0 right-0 bottom-0 bg-accent shadow-[0_0_12px_var(--accent-glow)]"
            />
          </div>

          {experienceData.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative group"
            >
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[30px] sm:-left-[46px] top-1.5 w-3.5 h-3.5 rounded-full bg-background border-2 border-accent group-hover:bg-accent group-hover:scale-125 transition-all duration-300" />

              {/* Experience Card */}
              <div className="hud-corner glass-panel p-6 sm:p-8 rounded-2xl border border-border group-hover:border-accent group-hover:shadow-[0_0_20px_var(--accent-glow)] transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-4 border-b border-border">
                  <div>
                    <span className="text-xs font-mono text-accent uppercase tracking-wider font-bold">
                      {item.role}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display font-black text-foreground mt-0.5">
                      {item.company}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-accent" />
                      {item.period}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                      {item.location}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-foreground/80 font-normal leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Key Achievements */}
                {item.achievements && item.achievements.length > 0 && (
                  <div className="space-y-2 mb-6">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-bold block">
                      Core Engineering Milestones:
                    </span>
                    {item.achievements.map((ach, aIdx) => (
                      <div key={aIdx} className="flex items-start gap-2 text-xs font-mono text-foreground/90">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Technologies used */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-surface border border-border text-[11px] font-mono text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
