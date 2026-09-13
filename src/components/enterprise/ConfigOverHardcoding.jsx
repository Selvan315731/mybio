"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
  Sliders,
  Eye,
  Check,
  Shield,
  FileCode,
  Sparkles,
  Layers,
  Settings,
  RefreshCw,
} from "lucide-react";

const INITIAL_SCHEMA = {
  formId: "casino_patron_intake_v2",
  version: "2.4.0",
  tenant: "GrandHorizon_Gaming",
  role: "Compliance_Officer",
  fields: [
    {
      id: "patronName",
      label: "Legal Full Name",
      type: "text",
      required: true,
      placeholder: "e.g. Johnathan Vance",
      visibility: "all",
      validation: "min_length_3",
    },
    {
      id: "ssnTin",
      label: "Social Security / TIN",
      type: "ssn",
      required: true,
      placeholder: "•••-••-••••",
      visibility: "compliance_only",
      validation: "fincen_tin_regex",
      masked: true,
    },
    {
      id: "buyInAmount",
      label: "Transaction Buy-In ($ USD)",
      type: "currency",
      required: true,
      placeholder: "10000",
      visibility: "all",
      validation: "threshold_check_10k",
    },
    {
      id: "sourceOfFunds",
      label: "Declared Source of Funds",
      type: "select",
      required: false,
      options: ["Bank Wire", "Cashier Check", "Physical Cash", "Cryptocurrency Settlement"],
      visibility: "all",
      validation: "enum_match",
    },
    {
      id: "kycDocument",
      label: "Govt Photo ID (Upload)",
      type: "file",
      required: false,
      visibility: "compliance_only",
      validation: "azure_sas_pdf_jpg",
    },
  ],
};

export default function ConfigOverHardcoding() {
  const [schema, setSchema] = useState(INITIAL_SCHEMA);
  const [activeRole, setActiveRole] = useState("compliance_only"); // 'all' | 'compliance_only' | 'cashier'
  const [formData, setFormData] = useState({
    patronName: "Robert C. Sterling",
    ssnTin: "842-19-9021",
    buyInAmount: "14500",
    sourceOfFunds: "Bank Wire",
  });
  const [activeTab, setActiveTab] = useState("preview"); // 'preview' | 'schema'

  // Toggle field required
  const toggleFieldRequired = (fieldId) => {
    setSchema((prev) => ({
      ...prev,
      fields: prev.fields.map((f) =>
        f.id === fieldId ? { ...f, required: !f.required } : f
      ),
    }));
  };

  // Toggle field visibility
  const toggleFieldVisibility = (fieldId) => {
    setSchema((prev) => ({
      ...prev,
      fields: prev.fields.map((f) =>
        f.id === fieldId
          ? {
              ...f,
              visibility:
                f.visibility === "all" ? "compliance_only" : "all",
            }
          : f
      ),
    }));
  };

  // Reset schema
  const resetSchema = () => {
    setSchema(INITIAL_SCHEMA);
    setActiveRole("compliance_only");
  };

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-border/40 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs uppercase tracking-wider mb-4">
            <Sliders className="w-3.5 h-3.5" />
            <span>Architecture Differentiator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-foreground">
            Configuration Over Hardcoding
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            Many enterprise systems I design are built around metadata-driven architectures. Watch how modifying the JSON schema immediately adapts the generated UI, validation rules, and role-based permissions.
          </p>
        </div>

        {/* Live Schema Engine Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Schema Configurator */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-surface/90 border border-border/80 shadow-xl backdrop-blur-md space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-foreground">
                <FileCode className="w-4 h-4 text-accent" />
                <span>DYNAMIC SCHEMA CONTROLS</span>
              </div>
              <button
                onClick={resetSchema}
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground font-mono transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Role Simulation Switcher */}
            <div>
              <label className="block text-xs font-mono text-muted-foreground uppercase mb-2">
                Simulate Active User Role:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setActiveRole("compliance_only")}
                  className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all text-left ${
                    activeRole === "compliance_only"
                      ? "bg-accent/10 border-accent text-accent font-bold"
                      : "bg-background border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  🛡️ Compliance Officer (All Fields)
                </button>
                <button
                  onClick={() => setActiveRole("cashier")}
                  className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all text-left ${
                    activeRole === "cashier"
                      ? "bg-accent/10 border-accent text-accent font-bold"
                      : "bg-background border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  🎰 Floor Cashier (Restricted PII)
                </button>
              </div>
            </div>

            {/* Field-by-Field Config Toggles */}
            <div className="space-y-3">
              <label className="block text-xs font-mono text-muted-foreground uppercase">
                Field Schema Attributes:
              </label>
              {schema.fields.map((field) => (
                <div
                  key={field.id}
                  className="p-3 rounded-xl bg-background border border-border/80 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="min-w-0">
                    <div className="font-bold text-foreground truncate">
                      {field.label}
                    </div>
                    <div className="font-mono text-[10px] text-muted-foreground truncate">
                      Type: <span className="text-accent font-semibold">{field.type}</span> • Validation: {field.validation}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => toggleFieldRequired(field.id)}
                      className={`px-2 py-1 rounded text-[10px] font-mono border transition-colors ${
                        field.required
                          ? "bg-red-500/10 text-red-500 border-red-500/30 font-bold"
                          : "bg-surface text-muted-foreground border-border"
                      }`}
                    >
                      {field.required ? "Required" : "Optional"}
                    </button>
                    <button
                      onClick={() => toggleFieldVisibility(field.id)}
                      className={`px-2 py-1 rounded text-[10px] font-mono border transition-colors ${
                        field.visibility === "compliance_only"
                          ? "bg-amber-500/10 text-amber-500 border-amber-500/30"
                          : "bg-surface text-muted-foreground border-border"
                      }`}
                    >
                      {field.visibility === "compliance_only" ? "Restricted" : "Public"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Micro Architecture Note */}
            <div className="p-3.5 rounded-xl bg-accent/5 border border-accent/20 text-xs text-muted-foreground leading-relaxed">
              <span className="font-bold text-foreground">Architectural Principle:</span> UIs adapt dynamically from backend metadata endpoints rather than fixed static templates. Form validations, visibility gates, and field structures are defined in JSON contracts.
            </div>
          </div>

          {/* Right Column: Live Generated UI Preview */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-surface/90 border border-border/80 shadow-xl backdrop-blur-md">
            {/* Tab Header */}
            <div className="flex items-center justify-between pb-6 border-b border-border mb-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveTab("preview")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors ${
                    activeTab === "preview"
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Live Generated UI</span>
                </button>
                <button
                  onClick={() => setActiveTab("schema")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors ${
                    activeTab === "schema"
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>JSON Contract</span>
                </button>
              </div>

              <div className="text-[11px] font-mono text-muted-foreground hidden sm:block">
                Render Target: Next.js Client Engine
              </div>
            </div>

            {/* Generated Form View */}
            {activeTab === "preview" ? (
              <div className="space-y-5">
                <div className="p-4 rounded-xl bg-background border border-border/80">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-sm font-bold text-foreground">
                        Patron Intake & AML Evaluation Form
                      </h4>
                      <div className="text-[11px] font-mono text-muted-foreground">
                        Tenant: {schema.tenant} • Schema: {schema.version}
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-green-500/10 text-green-500 border border-green-500/20 text-[10px] font-mono font-bold">
                      SCHEMA SYNCED
                    </span>
                  </div>

                  <div className="space-y-4">
                    {schema.fields.map((field) => {
                      // If role is cashier and field is compliance_only, hide or mask it
                      const isHidden =
                        activeRole === "cashier" && field.visibility === "compliance_only";

                      if (isHidden) {
                        return (
                          <div
                            key={field.id}
                            className="p-3 rounded-lg bg-surface/50 border border-border/40 text-xs text-muted-foreground flex items-center justify-between italic"
                          >
                            <span className="flex items-center gap-2">
                              <Shield className="w-3.5 h-3.5 text-amber-500" />
                              <span>{field.label} — [Hidden for Floor Cashier Role]</span>
                            </span>
                            <span className="font-mono text-[10px] text-amber-500">RBAC GATED</span>
                          </div>
                        );
                      }

                      return (
                        <div key={field.id} className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                              <span>{field.label}</span>
                              {field.required && (
                                <span className="text-red-500 font-bold">*</span>
                              )}
                            </label>
                            <span className="text-[10px] font-mono text-muted-foreground">
                              {field.validation}
                            </span>
                          </div>

                          {field.type === "select" ? (
                            <select
                              value={formData[field.id] || ""}
                              onChange={(e) =>
                                setFormData({ ...formData, [field.id]: e.target.value })
                              }
                              className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-xs text-foreground focus:outline-none focus:border-accent"
                            >
                              {field.options?.map((opt) => (
                                <option key={opt} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </select>
                          ) : field.type === "file" ? (
                            <div className="p-3 rounded-lg bg-surface border border-dashed border-border flex items-center justify-between text-xs text-muted-foreground">
                              <span>Upload government identity scan (PDF / JPG)</span>
                              <span className="px-2 py-1 rounded bg-accent/10 text-accent font-mono text-[10px] font-bold">
                                SAS UPLOAD READY
                              </span>
                            </div>
                          ) : (
                            <input
                              type="text"
                              value={formData[field.id] || ""}
                              placeholder={field.placeholder}
                              onChange={(e) =>
                                setFormData({ ...formData, [field.id]: e.target.value })
                              }
                              className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-xs text-foreground focus:outline-none focus:border-accent font-mono"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-4 mt-4 border-t border-border flex items-center justify-between">
                    <div className="text-[11px] font-mono text-muted-foreground">
                      Simulated Client Validation: <span className="text-green-500 font-bold">Passed</span>
                    </div>
                    <button className="px-4 py-2 rounded-lg bg-accent text-white font-medium text-xs shadow-md shadow-accent/20 hover:bg-accent/90 transition-colors">
                      Execute Submission →
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <pre className="p-4 rounded-xl bg-background border border-border/80 text-[11px] font-mono text-foreground overflow-x-auto leading-relaxed max-h-[420px]">
                {JSON.stringify(schema, null, 2)}
              </pre>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
