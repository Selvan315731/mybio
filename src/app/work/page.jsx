import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import ProjectSystemVisual from "@/components/projects/ProjectSystemVisual";
import projectsData from "@/data/projects.json";
import profileData from "@/data/profile.json";

export const metadata = {
  title: `Enterprise Systems Archive — Case Studies | ${profileData.name}`,
  description: "Complete archive of enterprise engineering projects across Casino RegTech, Wealth Management, Telemedicine, POS ERP, Inventory, and Cloud Automation.",
};

export default function WorkArchivePage() {
  return (
    <main className="min-h-screen pt-28 pb-20 px-4 sm:px-8 bg-background text-foreground">
      <div className="max-w-7xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors group font-bold"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>BACK TO HOME</span>
          </Link>
        </div>

        {/* Page Title */}
        <div className="mb-14">
          <span className="text-xs font-mono text-accent uppercase tracking-widest block mb-2 font-bold">
            ENTERPRISE ARCHIVE // 8 PRODUCTION SYSTEMS
          </span>
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-foreground tracking-tight">
            All Systems & Case Studies
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base font-medium mt-3 max-w-2xl leading-relaxed">
            A comprehensive catalog of production enterprise platforms, regulatory compliance engines, telemedicine WebRTC streams, offline mobile databases, and high-throughput backend APIs.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project) => (
            <Link
              key={project.id}
              href={`/work/${project.slug}`}
              className="group flex flex-col rounded-2xl overflow-hidden bg-surface/90 border border-border hover:border-accent hover:shadow-2xl transition-all duration-300 shadow-md"
            >
              <div className="p-3 bg-surface border-b border-border">
                <ProjectSystemVisual projectId={project.id} interactive={false} />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mb-2">
                    <span className="font-semibold">{project.year}</span>
                    <span className="font-bold text-accent">{project.role}</span>
                  </div>
                  <h2 className="text-lg font-display font-bold text-foreground group-hover:text-accent transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-xs text-muted-foreground font-medium mt-2 line-clamp-2 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {project.techStack?.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-background border border-border text-[10px] font-mono text-muted-foreground font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack?.length > 3 && (
                      <span className="text-[10px] font-mono text-muted-foreground self-center font-bold">
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>

                  <ArrowUpRight className="w-4 h-4 text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0 ml-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
