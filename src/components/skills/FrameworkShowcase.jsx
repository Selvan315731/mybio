"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Smartphone,
  Server,
  Layers,
  Zap,
  ShieldCheck,
  Activity,
  Database,
  RefreshCw,
  Sliders,
} from "lucide-react";

export default function FrameworkShowcase() {
  const [activeTab, setActiveTab] = useState("react");

  // State for interactive widgets inside the showcase
  const [componentState, setComponentState] = useState({ count: 128, mode: "active" });
  const [mobileSyncStatus, setMobileSyncStatus] = useState("synced");
  const [backendLatency, setBackendLatency] = useState(18);
  const [vueChartPoints, setVueChartPoints] = useState([45, 62, 85, 94, 110]);

  const frameworks = [
    {
      id: "react",
      title: "ReactJS",
      subtitle: "Reusable HOCs & AES256 Redux State",
      icon: Code2,
      accent: "#06b6d4",
      highlight: "Meta-Data Driven UI & Agora WebRTC",
    },
    {
      id: "reactnative",
      title: "React Native",
      subtitle: "Offline-First Mobile (Android & iOS)",
      icon: Smartphone,
      accent: "#6366f1",
      highlight: "SQLite Delta Sync & Native APIs",
    },
    {
      id: "nodejs",
      title: "Node.js & Express",
      subtitle: "RBAC Security & Data Masking APIs",
      icon: Server,
      accent: "#10b981",
      highlight: "Azure Blob SAS Tokens & Cron Jobs",
    },
    {
      id: "vuejs",
      title: "Vue.js",
      subtitle: "Enterprise Vuetify & ApexCharts",
      icon: Layers,
      accent: "#42b883",
      highlight: "Microsoft OAuth & Job Analytics",
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-8 border-t border-white/5 relative bg-[#090a0f]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-mono text-accent uppercase tracking-widest">
            03 / CORE FRAMEWORK SPECIALIZATIONS
          </span>
          <span className="h-px flex-1 max-w-[80px] bg-accent/30" />
        </div>

        <div className="mb-12">
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white uppercase tracking-tight">
            Framework & Runtime Mastery
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base font-light mt-2 max-w-2xl">
            Deep execution capability across enterprise web systems, cross-platform offline mobile apps, secure Node.js microservices, and Vue.js dashboards.
          </p>
        </div>

        {/* Tab Selector Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {frameworks.map((fw) => {
            const Icon = fw.icon;
            const isActive = activeTab === fw.id;

            return (
              <button
                key={fw.id}
                onClick={() => setActiveTab(fw.id)}
                className={`p-4 rounded-xl text-left border transition-all duration-300 relative ${
                  isActive
                    ? "bg-surface-elevated border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.05)]"
                    : "bg-surface/50 border-white/5 hover:border-white/15 hover:bg-surface"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFrameworkIndicator"
                    className="absolute inset-0 rounded-xl border-2 border-accent pointer-events-none"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${fw.accent}15`, color: fw.accent }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {fw.highlight.split(" ")[0]}
                  </span>
                </div>
                <div className="text-sm font-display font-bold text-white mb-0.5">
                  {fw.title}
                </div>
                <div className="text-[11px] font-mono text-muted-foreground truncate">
                  {fw.subtitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* Framework Showcase Interactive Preview Container */}
        <div className="glass-panel-elevated p-6 sm:p-10 rounded-2xl border border-white/10 min-h-[420px] flex items-center justify-center relative overflow-hidden">
          <AnimatePresence mode="wait">
            {/* REACTJS SHOWCASE */}
            {activeTab === "react" && (
              <motion.div
                key="react"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-6 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Meta-Data Driven UI & Agora Video</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                    Higher-Order Components & Encrypted State
                  </h3>
                  <p className="text-sm text-slate-300 font-light leading-relaxed">
                    Building reusable component ecosystems using HOCs, Redux Thunk/Persist with custom AES256 local storage encryption, and integrating Agora WebRTC for sub-second ICU telemedicine calls.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
                    {["Redux Persist (AES256)", "Agora WebRTC Calls", "Material UI / MUI", "Formik & Yup"].map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-md bg-surface border border-white/10 text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Simulated Interactive React Widget */}
                <div className="lg:col-span-6 p-6 rounded-xl bg-[#0b0d14] border border-cyan-500/20 shadow-inner font-mono text-xs">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10 text-muted-foreground">
                    <span className="text-cyan-400 font-semibold">withEncryptedStore.jsx</span>
                    <span className="text-[10px]">React HOC + Redux Persist</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-surface border border-white/5 flex items-center justify-between">
                      <span className="text-slate-300">Local Storage AES256 State:</span>
                      <span className="text-emerald-400 font-bold">ENCRYPTED (Secure)</span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setComponentState(prev => ({ ...prev, count: prev.count + 1 }))}
                        className="flex-1 py-2 rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/30 transition-colors"
                      >
                        Dispatch State Mutation
                      </button>
                    </div>

                    <div className="p-3 rounded-lg bg-black/40 text-[11px] text-slate-400 space-y-1">
                      <p className="text-cyan-300">// Custom AES256 transform</p>
                      <p>const encryptTransform = createTransform(inbound =&gt; AES.encrypt(inbound));</p>
                      <p className="text-emerald-400">status: persistent storage verified</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* REACT NATIVE SHOWCASE */}
            {activeTab === "reactnative" && (
              <motion.div
                key="reactnative"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-6 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono">
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Android & iOS Offline Sync</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                    Offline-First SQLite Session Journaling
                  </h3>
                  <p className="text-sm text-slate-300 font-light leading-relaxed">
                    Constructed complete Android & iOS applications from scratch with native bridges, 1-to-N behavior duration tracking, and automatic delta synchronization to the server when network connectivity resumes.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
                    {["SQLite / PouchDB", "1-N Duration Timers", "Network State Listeners", "Native Mobile APIs"].map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-md bg-surface border border-white/10 text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Simulated Interactive Mobile Widget */}
                <div className="lg:col-span-6 p-6 rounded-xl bg-[#0b0d14] border border-indigo-500/20 shadow-inner font-mono text-xs">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10 text-muted-foreground">
                    <span className="text-indigo-400 font-semibold">BehaviorSessionSync.tsx</span>
                    <span className="text-[10px]">React Native Android Engine</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-surface border border-white/5 flex items-center justify-between">
                      <span className="text-slate-300">Network Engine Status:</span>
                      <span className={`font-bold uppercase ${mobileSyncStatus === "synced" ? "text-emerald-400" : "text-amber-400"}`}>
                        ● {mobileSyncStatus}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setMobileSyncStatus(mobileSyncStatus === "synced" ? "offline (queued 6 durations)" : "synced")}
                        className="flex-1 py-2 rounded-lg bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/30 transition-colors"
                      >
                        Toggle Network Drop / Reconnect
                      </button>
                    </div>

                    <div className="p-3 rounded-lg bg-black/40 text-[11px] text-slate-400 space-y-1">
                      <p className="text-indigo-300">// 1-to-N behavior timer recording</p>
                      <p>await SQLite.insertAsync(&apos;behavior_durations&apos;, delta);</p>
                      <p className="text-emerald-400">status: offline queue auto-sync active</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* NODE.JS & EXPRESS SHOWCASE */}
            {activeTab === "nodejs" && (
              <motion.div
                key="nodejs"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-6 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>RBAC Security & Data Masking</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                    Casino REST APIs & Azure Blob SAS Tokens
                  </h3>
                  <p className="text-sm text-slate-300 font-light leading-relaxed">
                    Engineering high-throughput Node.js & Express RESTful services with dynamic patron validation (SSN/address checks), automated sensitive data masking in logs, SAS-tokenized Azure Blob Storage, and scheduled cron jobs.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
                    {["JWT Encrypted Payloads", "Azure Blob SAS", "Data Masking Layer", "Scheduled Cron Workers"].map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-md bg-surface border border-white/10 text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Simulated Interactive Node.js Widget */}
                <div className="lg:col-span-6 p-6 rounded-xl bg-[#0b0d14] border border-emerald-500/20 shadow-inner font-mono text-xs">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10 text-muted-foreground">
                    <span className="text-emerald-400 font-semibold">controllers/casinoApi.js</span>
                    <span className="text-[10px]">Node.js Express + Azure Blob</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-surface border border-white/5 flex items-center justify-between">
                      <span className="text-slate-300">API Response Latency:</span>
                      <span className="text-emerald-400 font-bold">{backendLatency}ms (Masked PII)</span>
                    </div>

                    <button
                      onClick={() => setBackendLatency(Math.floor(Math.random() * 15) + 10)}
                      className="w-full py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/30 transition-colors"
                    >
                      Execute Vendor Upsert with Masking
                    </button>

                    <div className="p-3 rounded-lg bg-black/40 text-[11px] text-slate-400 space-y-1">
                      <p className="text-emerald-400">// Automatic SSN / PII masking in log stream</p>
                      <p>const safePayload = maskSensitiveFields(patronData);</p>
                      <p className="text-slate-300">blobUrl = generateSasToken(attachmentId);</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* VUE.JS SHOWCASE */}
            {activeTab === "vuejs" && (
              <motion.div
                key="vuejs"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-6 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-300 text-xs font-mono">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Vuetify & Microsoft OAuth SSO</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                    Interactive Job Dashboards & ApexCharts
                  </h3>
                  <p className="text-sm text-slate-300 font-light leading-relaxed">
                    Developing high-productivity admin portals in Vue.js with Vuetify components, custom multi-step form validation, Microsoft OAuth single sign-on, and real-time operational job telemetry via vue-apexcharts.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
                    {["Vuetify Component Suite", "Vue-ApexCharts", "Microsoft OAuth SSO", "Python 3 Azure API"].map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-md bg-surface border border-white/10 text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Simulated Interactive Vue Widget */}
                <div className="lg:col-span-6 p-6 rounded-xl bg-[#0b0d14] border border-emerald-400/20 shadow-inner font-mono text-xs">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10 text-muted-foreground">
                    <span className="text-emerald-300 font-semibold">JobMetricsDashboard.vue</span>
                    <span className="text-[10px]">Vuetify + ApexCharts</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-surface border border-white/5 flex items-center justify-between">
                      <span className="text-slate-300">Jobs Telemetry (ApexCharts):</span>
                      <span className="text-emerald-300 font-bold">{vueChartPoints.join(" → ")}</span>
                    </div>

                    <button
                      onClick={() => setVueChartPoints([
                        Math.floor(Math.random() * 40) + 30,
                        Math.floor(Math.random() * 40) + 50,
                        Math.floor(Math.random() * 40) + 70,
                        Math.floor(Math.random() * 40) + 90,
                        Math.floor(Math.random() * 40) + 110,
                      ])}
                      className="w-full py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/30 transition-colors"
                    >
                      Refresh Real-Time Job Streams
                    </button>

                    <div className="p-3 rounded-lg bg-black/40 text-[11px] text-slate-400 space-y-1">
                      <p className="text-emerald-300">&lt;apexchart type=&quot;area&quot; :options=&quot;chartOptions&quot; :series=&quot;series&quot; /&gt;</p>
                      <p className="text-slate-300">auth: Microsoft OAuth 2.0 active</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
