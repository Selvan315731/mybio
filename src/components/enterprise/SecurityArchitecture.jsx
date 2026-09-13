"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  Eye,
  EyeOff,
  Key,
  FileCheck,
  Server,
  UserCheck,
  Clock,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export default function SecurityArchitecture() {
  const [isMasked, setIsMasked] = useState(true);
  const [activeTab, setActiveTab] = useState("rbac"); // 'rbac' | 'encryption' | 'sas' | 'audit'

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-border/40 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs uppercase tracking-wider mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Zero-Trust Enterprise Foundation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-foreground">
            Security Is Part of the Architecture
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            Enterprise systems handle sensitive financial, healthcare, and regulatory data. I architect security into every tier—from JWT authorization matrices and database PII masking to short-lived Azure SAS tokens.
          </p>
        </div>

        {/* Security Matrix Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <button
            onClick={() => setActiveTab("rbac")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium border transition-all ${
              activeTab === "rbac"
                ? "bg-foreground text-background border-foreground font-bold shadow-md"
                : "bg-surface text-muted-foreground border-border hover:text-foreground"
            }`}
          >
            🛡️ Role-Based Access (RBAC)
          </button>
          <button
            onClick={() => setActiveTab("encryption")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium border transition-all ${
              activeTab === "encryption"
                ? "bg-foreground text-background border-foreground font-bold shadow-md"
                : "bg-surface text-muted-foreground border-border hover:text-foreground"
            }`}
          >
            🔐 PII Masking & AES-256
          </button>
          <button
            onClick={() => setActiveTab("sas")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium border transition-all ${
              activeTab === "sas"
                ? "bg-foreground text-background border-foreground font-bold shadow-md"
                : "bg-surface text-muted-foreground border-border hover:text-foreground"
            }`}
          >
            ☁️ Ephemeral SAS Tokens
          </button>
          <button
            onClick={() => setActiveTab("audit")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium border transition-all ${
              activeTab === "audit"
                ? "bg-foreground text-background border-foreground font-bold shadow-md"
                : "bg-surface text-muted-foreground border-border hover:text-foreground"
            }`}
          >
            📜 Immutable Audit Trails
          </button>
        </div>

        {/* Security Module Panel */}
        <div className="p-6 sm:p-8 lg:p-10 rounded-2xl bg-surface/90 border border-border/80 shadow-2xl backdrop-blur-md">
          {activeTab === "rbac" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    Tenant-Aware RBAC Permission Matrix
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Granular permission enforcement across organizations, tenants, and roles.
                  </p>
                </div>
                <div className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-mono font-bold self-start">
                  JWT + Role Claims
                </div>
              </div>

              {/* RBAC Matrix Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground font-mono uppercase">
                      <th className="py-3 px-4">System Capability</th>
                      <th className="py-3 px-4">Compliance Admin</th>
                      <th className="py-3 px-4">Floor Cashier</th>
                      <th className="py-3 px-4">Auditor (Read-Only)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    <tr>
                      <td className="py-3 px-4 font-semibold text-foreground">
                        View Unmasked SSN / TIN PII
                      </td>
                      <td className="py-3 px-4 text-green-500 font-bold">✓ Full Access</td>
                      <td className="py-3 px-4 text-red-500 font-bold">✗ Masked Only</td>
                      <td className="py-3 px-4 text-amber-500 font-bold">⚠️ Redacted</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-foreground">
                        Trigger CTR / SAR Filing
                      </td>
                      <td className="py-3 px-4 text-green-500 font-bold">✓ Authorize & Submit</td>
                      <td className="py-3 px-4 text-red-500 font-bold">✗ No Privilege</td>
                      <td className="py-3 px-4 text-red-500 font-bold">✗ View Only</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-foreground">
                        Generate Expiring Blob SAS Tokens
                      </td>
                      <td className="py-3 px-4 text-green-500 font-bold">✓ 15-Min Ephemeral</td>
                      <td className="py-3 px-4 text-green-500 font-bold">✓ Upload Only</td>
                      <td className="py-3 px-4 text-green-500 font-bold">✓ Read-Only SAS</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-foreground">
                        Modify Dynamic Schema & Tax Rules
                      </td>
                      <td className="py-3 px-4 text-green-500 font-bold">✓ Configuration Access</td>
                      <td className="py-3 px-4 text-red-500 font-bold">✗ Forbidden</td>
                      <td className="py-3 px-4 text-red-500 font-bold">✗ Forbidden</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "encryption" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    PII Masking & Encrypted Payloads
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Live demonstration of database and API layer PII field redaction.
                  </p>
                </div>
                <button
                  onClick={() => setIsMasked(!isMasked)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background border border-border text-xs font-mono text-foreground hover:border-accent transition-colors"
                >
                  {isMasked ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>{isMasked ? "Reveal Masked PII" : "Enforce PII Masking"}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 rounded-xl bg-background border border-border/80 space-y-3">
                  <div className="text-xs font-mono font-bold text-accent uppercase">
                    Client Ingestion Payload (Transit)
                  </div>
                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between p-2 rounded bg-surface border border-border">
                      <span className="text-muted-foreground">Patron:</span>
                      <span className="text-foreground font-semibold">David M. Sterling</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-surface border border-border">
                      <span className="text-muted-foreground">Tax Identifier (TIN):</span>
                      <span className={isMasked ? "text-amber-400 font-bold" : "text-green-500 font-bold"}>
                        {isMasked ? "•••-••-8921" : "842-19-8921"}
                      </span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-surface border border-border">
                      <span className="text-muted-foreground">Passport ID:</span>
                      <span className={isMasked ? "text-amber-400 font-bold" : "text-green-500 font-bold"}>
                        {isMasked ? "USA-••••••449" : "USA-P9812449"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-background border border-border/80 space-y-3">
                  <div className="text-xs font-mono font-bold text-accent uppercase">
                    Database Encryption Status (At Rest)
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Sensitive columns in PostgreSQL are encrypted using AES-256 with key derivation from application master secrets. Raw PII is never stored in plain text or emitted to unauthenticated log streams.
                  </p>
                  <div className="p-2.5 rounded bg-surface border border-border font-mono text-[11px] text-green-500 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>AES-256-GCM Column Level Encryption Active</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "sas" && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-border">
                <h3 className="text-xl font-bold text-foreground">
                  Short-Lived Ephemeral SAS Tokens
                </h3>
                <p className="text-sm text-muted-foreground">
                  Zero permanent public URLs for compliance documents, government IDs, and medical scans.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-background border border-border/80 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-muted-foreground">Blob Storage Provider:</span>
                  <span className="text-accent font-semibold">Azure Blob Storage (Encrypted Vault)</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-muted-foreground">SAS Token Expiry:</span>
                  <span className="text-amber-400 font-bold">15 Minutes (900s TTL)</span>
                </div>
                <div className="p-3 rounded-lg bg-surface border border-border font-mono text-[10px] text-muted-foreground break-all">
                  https://compliancevault.blob.core.windows.net/docs/kyc_patron_412.pdf?sp=r&st=2026-09-13T14:00:00Z&se=2026-09-13T14:15:00Z&spr=https&sig=a8F9%2B...
                </div>
              </div>
            </div>
          )}

          {activeTab === "audit" && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-border">
                <h3 className="text-xl font-bold text-foreground">
                  Immutable Tamper-Proof Audit Logging
                </h3>
                <p className="text-sm text-muted-foreground">
                  Every compliance decision, schema adjustment, and session access generates an append-only audit record.
                </p>
              </div>

              <div className="space-y-2 font-mono text-xs">
                <div className="p-3 rounded-lg bg-background border border-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-accent" />
                    <span className="text-foreground">CTR_REVIEW_APPROVED</span>
                    <span className="text-muted-foreground">• Case #CTR-9014</span>
                  </div>
                  <span className="text-green-500 font-bold">SHA-256 SIGNED</span>
                </div>
                <div className="p-3 rounded-lg bg-background border border-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-accent" />
                    <span className="text-foreground">SAS_TOKEN_GENERATED</span>
                    <span className="text-muted-foreground">• KYC Document Vault</span>
                  </div>
                  <span className="text-green-500 font-bold">SHA-256 SIGNED</span>
                </div>
                <div className="p-3 rounded-lg bg-background border border-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-accent" />
                    <span className="text-foreground">SCHEMA_VALIDATION_PASSED</span>
                    <span className="text-muted-foreground">• Version 2.4.0</span>
                  </div>
                  <span className="text-green-500 font-bold">SHA-256 SIGNED</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
