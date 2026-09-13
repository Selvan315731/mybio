"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ChevronRight,
  Shield,
  Layers,
  Sparkles,
  Lock,
  ExternalLink,
  X,
  CheckCircle2,
  Cpu,
} from "lucide-react";
import ProjectSystemVisual from "@/components/projects/ProjectSystemVisual";
import projectsData from "@/data/projects.json";

export default function FeaturedProjects() {
  const featuredProjects = projectsData.filter((p) => p.featured);
  const [activeModalProject, setActiveModalProject] = useState(null);

  // Lock body scroll and handle Escape key when case study modal is open
  useEffect(() => {
    if (activeModalProject) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e) => {
        if (e.key === "Escape") setActiveModalProject(null);
      };
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [activeModalProject]);

  return (
    <section id="projects" className="py-28 px-4 sm:px-8 border-t border-border bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Production Case Studies</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-foreground tracking-tight">
            Enterprise Systems I&apos;ve Worked On
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base font-medium mt-4 leading-relaxed">
            Architected for complex regulatory rules, encrypted asset ownership, low-latency clinical WebRTC telemetry, and automated multi-tenant ERP operations.
          </p>
        </div>

        {/* Featured Projects Narrative Cards */}
        <div className="space-y-24">
          {featuredProjects.map((project, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                {/* Visual System Blueprint Column */}
                <div
                  className={`lg:col-span-7 ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div
                    onClick={() => setActiveModalProject(project)}
                    className="block relative rounded-2xl overflow-hidden bg-surface/90 border border-border group-hover:border-accent group-hover:shadow-2xl transition-all duration-500 shadow-xl cursor-pointer"
                  >
                    <ProjectSystemVisual projectId={project.id} interactive={true} />
                  </div>
                </div>

                {/* Narrative Details Column */}
                <div
                  className={`lg:col-span-5 space-y-4 ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-accent font-bold tracking-wider uppercase">
                      0{idx + 1} • {project.category}
                    </span>
                    <span className="text-muted-foreground font-semibold">{project.year}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-foreground group-hover:text-accent transition-colors">
                    <button
                      onClick={() => setActiveModalProject(project)}
                      className="text-left hover:underline"
                    >
                      {project.title}
                    </button>
                  </h3>

                  <p className="text-sm text-foreground/85 font-medium leading-relaxed">
                    {project.summary}
                  </p>

                  {/* Highlights List */}
                  <div className="space-y-1.5 py-2">
                    {project.highlights?.slice(0, 3).map((h, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technologies Stack */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.techStack?.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg bg-surface border border-border text-[11px] font-mono font-semibold text-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Links */}
                  <div className="pt-3 flex items-center gap-4">
                    <button
                      onClick={() => setActiveModalProject(project)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-white font-mono text-xs font-bold hover:bg-accent/90 transition-colors shadow-md shadow-accent/20"
                    >
                      <span>INSPECT CASE STUDY</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    <Link
                      href={`/work/${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <span>Full Page</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-20">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-surface/90 border border-border text-foreground font-mono text-xs font-bold uppercase tracking-wider hover:border-accent hover:text-accent transition-all shadow-lg backdrop-blur-md"
          >
            <span>VIEW ALL 8 ENTERPRISE ARCHIVES</span>
            <ArrowUpRight className="w-4 h-4 text-accent" />
          </Link>
        </div>
      </div>

      {/* Full-Screen Interactive Case Study Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModalProject(null)}
            className="fixed inset-0 z-50 overflow-y-auto bg-background/85 backdrop-blur-xl overscroll-contain"
          >
            <div className="min-h-full flex items-center justify-center p-4 sm:p-6 lg:p-10">
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-5xl my-8 p-6 sm:p-10 rounded-3xl bg-surface border border-border shadow-2xl space-y-8 text-left"
              >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalProject(null)}
                aria-label="Close modal"
                className="absolute top-6 right-6 p-2 rounded-full bg-background border border-border text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-accent font-bold">
                  {activeModalProject.category}
                </span>
                <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-foreground mt-1">
                  {activeModalProject.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {activeModalProject.subtitle}
                </p>
              </div>

              {/* Interactive Visual Canvas */}
              <div className="rounded-2xl overflow-hidden border border-border">
                <ProjectSystemVisual projectId={activeModalProject.id} interactive={true} />
              </div>

              {/* Problem & Solution Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-background border border-border space-y-2">
                  <div className="text-xs font-mono font-bold text-red-400 uppercase">
                    Business Problem
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {activeModalProject.problem}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-background border border-border space-y-2">
                  <div className="text-xs font-mono font-bold text-green-400 uppercase">
                    Engineered Solution
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {activeModalProject.solution}
                  </p>
                </div>
              </div>

              {/* Architecture & Security Breakdown */}
              <div className="space-y-4">
                <h4 className="text-base font-bold text-foreground flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-accent" />
                  <span>Architecture & Data Flow</span>
                </h4>
                <div className="p-4 rounded-xl bg-background border border-border font-mono text-xs text-foreground leading-relaxed">
                  {activeModalProject.architecture}
                </div>
              </div>

              {/* Security & Business Rules */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-background border border-border space-y-2">
                  <div className="text-xs font-mono font-bold text-accent uppercase flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Security & Compliance</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {activeModalProject.security}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-background border border-border space-y-2">
                  <div className="text-xs font-mono font-bold text-accent uppercase flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5" />
                    <span>Configurable Business Rules</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {activeModalProject.businessRules}
                  </p>
                </div>
              </div>

              {/* Business Impact */}
              <div className="p-5 rounded-2xl bg-accent/5 border border-accent/20 space-y-2">
                <div className="text-xs font-mono font-bold text-accent uppercase">
                  Delivered Business Impact
                </div>
                <p className="text-xs sm:text-sm text-foreground leading-relaxed font-medium">
                  {activeModalProject.businessImpact}
                </p>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <Link
                  href={`/work/${activeModalProject.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white font-mono text-xs font-bold hover:bg-accent/90 transition-colors"
                >
                  <span>Open Dedicated Page</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>

                <button
                  onClick={() => setActiveModalProject(null)}
                  className="px-5 py-2.5 rounded-xl bg-background border border-border text-xs font-mono font-semibold text-foreground hover:bg-surface transition-colors"
                >
                  Close Case Study
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </section>
  );
}
