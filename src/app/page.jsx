import Hero from "@/components/hero/Hero";
import EnterpriseSystemMap from "@/components/enterprise/EnterpriseSystemMap";
import EnterpriseCapabilities from "@/components/capabilities/EnterpriseCapabilities";
import FeaturedProjects from "@/components/projects/FeaturedProjects";
import ConfigOverHardcoding from "@/components/enterprise/ConfigOverHardcoding";
import LayeredArchitecture from "@/components/enterprise/LayeredArchitecture";
import SecurityArchitecture from "@/components/enterprise/SecurityArchitecture";
import AIDecisionSupport from "@/components/enterprise/AIDecisionSupport";
import IntegrationsEcosystem from "@/components/enterprise/IntegrationsEcosystem";
import TechEcosystem from "@/components/skills/TechEcosystem";
import EngineeringPhilosophy from "@/components/architecture/EngineeringPhilosophy";
import ExperienceTimeline from "@/components/experience/ExperienceTimeline";
import MetricsSection from "@/components/metrics/MetricsSection";
import Contact from "@/components/contact/Contact";

export default function HomePage() {
  return (
    <main className="relative flex flex-col w-full overflow-hidden">
      {/* 01: Hero Entrance & System Pipeline */}
      <Hero />

      {/* 02: Signature Interactive Enterprise System Map */}
      <EnterpriseSystemMap />

      {/* 03: Enterprise Capabilities (From Business Rules to Production) */}
      <EnterpriseCapabilities />

      {/* 04: Featured Enterprise Case Studies & Blueprints */}
      <FeaturedProjects />

      {/* 05: Differentiator: Configuration Over Hardcoding (Live Schema Engine) */}
      <ConfigOverHardcoding />

      {/* 06: 7-Tier Enterprise Architecture Methodology */}
      <LayeredArchitecture />

      {/* 07: Security & Compliance Foundation (RBAC, PII, SAS Tokens) */}
      <SecurityArchitecture />

      {/* 08: AI & Intelligent Decision Support Systems */}
      <AIDecisionSupport />

      {/* 09: Third-Party & Hardware Integrations Ecosystem */}
      <IntegrationsEcosystem />

      {/* 10: Technical Stack & Framework Capabilities */}
      <TechEcosystem />

      {/* 11: Developer Philosophy & Core Focus */}
      <EngineeringPhilosophy />

      {/* 12: Production Career Progression Timeline */}
      <ExperienceTimeline />

      {/* 13: Viewport Key Engineering Metrics */}
      <MetricsSection />

      {/* 14: Contact & Project Consultation */}
      <Contact />
    </main>
  );
}
