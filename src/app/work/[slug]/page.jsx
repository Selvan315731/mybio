import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  Server,
  Lock,
  Shield,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  Zap,
} from "lucide-react";
import ProjectSystemVisual from "@/components/projects/ProjectSystemVisual";
import projectsData from "@/data/projects.json";
import profileData from "@/data/profile.json";

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }) {
  const project = projectsData.find((p) => p.slug === params.slug);
  if (!project) return {};

  return {
    title: `${project.title} — Enterprise Case Study | ${profileData.name}`,
    description: project.summary,
  };
}

export default function ProjectDetailPage({ params }) {
  const project = projectsData.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  const currentIndex = projectsData.findIndex((p) => p.slug === params.slug);
  const nextProject = projectsData[(currentIndex + 1) % projectsData.length];

  return (
    <main className="min-h-screen pt-28 pb-20 px-4 sm:px-8 bg-background text-foreground">
      <div className="max-w-5xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors group font-bold"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>BACK TO ALL ENTERPRISE ARCHIVES</span>
          </Link>

          <span className="text-xs font-mono text-accent uppercase tracking-wider font-bold">
            {project.category}
          </span>
        </div>

        {/* Project Header Title */}
        <div className="space-y-4 mb-10">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold text-foreground tracking-tight">
            {project.title}
          </h1>
          <p className="text-base sm:text-xl font-display font-medium text-muted-foreground max-w-3xl leading-relaxed">
            {project.subtitle}
          </p>
        </div>

        {/* Specs Table Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-surface border border-border mb-12 font-mono text-xs shadow-md">
          <div>
            <span className="text-muted-foreground uppercase text-[10px] block mb-1 font-bold">
              Role
            </span>
            <span className="text-foreground font-bold">{project.role}</span>
          </div>
          <div>
            <span className="text-muted-foreground uppercase text-[10px] block mb-1 font-bold">
              Domain
            </span>
            <span className="text-foreground font-bold">{project.domain}</span>
          </div>
          <div>
            <span className="text-muted-foreground uppercase text-[10px] block mb-1 font-bold">
              Timeline
            </span>
            <span className="text-foreground font-bold">{project.year}</span>
          </div>
          <div>
            <span className="text-muted-foreground uppercase text-[10px] block mb-1 font-bold">
              Client / Scope
            </span>
            <span className="text-accent font-bold">{project.client}</span>
          </div>
        </div>

        {/* Interactive Live System Visual Blueprint */}
        <div className="mb-16">
          <ProjectSystemVisual projectId={project.id} interactive={true} />
        </div>

        {/* Core Case Study Content Sections */}
        <div className="space-y-12">
          {/* Business Problem & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-surface border border-border space-y-3 shadow-md">
              <h2 className="text-lg font-display font-bold text-red-400 uppercase">
                The Business Problem
              </h2>
              <p className="text-sm text-foreground/85 font-medium leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-surface border border-border space-y-3 shadow-md">
              <h2 className="text-lg font-display font-bold text-green-400 uppercase">
                The Engineered Solution
              </h2>
              <p className="text-sm text-foreground/85 font-medium leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Architecture Topology */}
          <section className="p-8 rounded-2xl bg-surface/90 border border-border space-y-4 shadow-md">
            <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase tracking-widest font-bold">
              <Server className="w-4 h-4" />
              <span>System Topology & Data Pipeline</span>
            </div>
            <div className="p-4 rounded-xl bg-background border border-border font-mono text-xs sm:text-sm text-foreground leading-relaxed">
              {project.architecture}
            </div>
          </section>

          {/* Key System Highlights */}
          <section className="p-8 rounded-2xl bg-surface/90 border border-border space-y-4 shadow-md">
            <h2 className="text-xl font-display font-bold text-foreground">
              Key Features & Enterprise Capabilities
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {project.highlights?.map((h, hIdx) => (
                <div key={hIdx} className="flex items-start gap-3 p-3.5 rounded-xl bg-background border border-border/80 text-xs sm:text-sm text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Security & Business Rules */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-surface border border-border space-y-3 shadow-md">
              <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase font-bold">
                <Lock className="w-4 h-4" />
                <span>Security & Access Control</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {project.security}
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-surface border border-border space-y-3 shadow-md">
              <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase font-bold">
                <Shield className="w-4 h-4" />
                <span>Configurable Business Rules</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {project.businessRules}
              </p>
            </div>
          </div>

          {/* Technical Challenges & System Design */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-surface border border-border space-y-3 shadow-md">
              <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Technical Challenges</span>
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {project.technicalChallenges}
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-surface border border-border space-y-3 shadow-md">
              <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-500" />
                <span>System Design & Decoupling</span>
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {project.systemDesign}
              </p>
            </div>
          </div>

          {/* Technologies Stack */}
          <section className="space-y-4">
            <h2 className="text-xl font-display font-bold text-foreground">
              Technologies & Frameworks
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack?.map((t) => (
                <span
                  key={t}
                  className="px-4 py-2 rounded-xl bg-surface border border-border text-xs font-mono text-foreground font-bold"
                >
                  {t}
                </span>
              ))}
            </div>
          </section>

          {/* Business Impact & Result */}
          <section className="p-8 rounded-2xl bg-accent/10 border border-accent/30 space-y-3 shadow-md">
            <h2 className="text-lg font-display font-bold text-foreground uppercase">
              Business Result & Delivered Capability
            </h2>
            <p className="text-sm sm:text-base text-foreground font-medium leading-relaxed">
              {project.businessImpact}
            </p>
          </section>
        </div>

        {/* Next Project Footer Bar */}
        <div className="mt-20 pt-10 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link
            href="/work"
            className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors font-bold"
          >
            ← RETURN TO ALL ARCHIVES
          </Link>

          <Link
            href={`/work/${nextProject.slug}`}
            className="group flex items-center gap-3 p-4 rounded-xl bg-surface border border-border hover:border-accent transition-all shadow-md"
          >
            <div className="text-right">
              <span className="text-[10px] font-mono text-muted-foreground uppercase block font-bold">
                NEXT CASE STUDY
              </span>
              <span className="text-sm font-display font-bold text-foreground group-hover:text-accent transition-colors">
                {nextProject.title}
              </span>
            </div>
            <ArrowUpRight className="w-5 h-5 text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </main>
  );
}
