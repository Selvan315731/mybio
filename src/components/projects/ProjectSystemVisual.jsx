"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Activity,
  DollarSign,
  Smartphone,
  Package,
  Layers,
  Lock,
  Wifi,
  WifiOff,
  Video,
  Radio,
  RefreshCw,
  Database,
  Key,
  Server,
  Sparkles,
  Printer,
  FileText,
  FileSpreadsheet,
  Gavel,
  Users,
  Network,
  Stethoscope,
  Brain,
  ShoppingCart,
  TrendingUp,
  Clock,
  CheckCircle2,
} from "lucide-react";

export default function ProjectSystemVisual({ projectId, interactive = true }) {
  // Interactive internal states for each system preview
  const [offlineStatus, setOfflineStatus] = useState("online");
  const [maskState, setMaskState] = useState(true);
  const [invoiceFormat, setInvoiceFormat] = useState("thermal"); // 'a4' | 'thermal' | 'custom'
  const [auctionBid, setAuctionBid] = useState(1425000);
  const [bidHistory, setBidHistory] = useState([
    { bidder: "Bidder #409", amount: 1400000, time: "2m ago" },
    { bidder: "You (HNW Office)", amount: 1425000, time: "Just now" },
  ]);
  const [godownStock, setGodownStock] = useState(450);
  const [graphFocusNode, setGraphFocusNode] = useState("patron"); // 'patron' | 'proxy' | 'table'

  // Place a counter bid
  const handlePlaceBid = (e) => {
    e.preventDefault();
    const nextBid = auctionBid + 25000;
    setAuctionBid(nextBid);
    setBidHistory((prev) => [
      { bidder: "You (HNW Office)", amount: nextBid, time: "Just now" },
      ...prev.slice(0, 2),
    ]);
  };

  // Simulate POS checkout & stock reduction
  const handleCheckoutSale = (e) => {
    e.preventDefault();
    setGodownStock((prev) => Math.max(0, prev - 1));
  };

  return (
    <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-gradient-to-br from-surface to-surface-elevated border border-border flex flex-col justify-between p-5 font-mono text-xs select-none shadow-inner group">
      {/* Background Tech Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

      {/* 1. CASINO MANAGEMENT SYSTEM (Patron Relationship Graph & FinCEN Engine) */}
      {projectId === "casino-management-system" && (
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-2 text-amber-500 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>CASINO AML & PATRON GRAPH ENGINE</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/30 text-[10px] font-bold">
              PII MASKING: {maskState ? "ACTIVE" : "EXPOSED"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-auto">
            {/* Patron Relationship Node */}
            <div
              onClick={() => setGraphFocusNode("patron")}
              className={`p-3 rounded-xl border cursor-pointer transition-all ${
                graphFocusNode === "patron"
                  ? "bg-accent/10 border-accent text-foreground"
                  : "bg-surface border-border text-muted-foreground"
              }`}
            >
              <div className="flex justify-between items-center text-[10px] uppercase mb-1">
                <span>Primary Patron</span>
                <span className="text-accent font-bold">Node #1</span>
              </div>
              <div className="text-foreground font-bold truncate">Robert C. Sterling</div>
              <div className="text-[11px] text-amber-400 font-semibold">
                TIN: {maskState ? "•••-••-8921" : "842-19-8921"}
              </div>
            </div>

            {/* AML Suspicious Activity Analysis */}
            <div
              onClick={() => setGraphFocusNode("proxy")}
              className={`p-3 rounded-xl border cursor-pointer transition-all ${
                graphFocusNode === "proxy"
                  ? "bg-accent/10 border-accent text-foreground"
                  : "bg-surface border-border text-muted-foreground"
              }`}
            >
              <div className="flex justify-between items-center text-[10px] uppercase mb-1">
                <span>AML Risk Signals</span>
                <span className="text-red-400 font-bold">2 Proxies</span>
              </div>
              <div className="text-foreground font-bold truncate">Aggregate: $14,500</div>
              <div className="text-[10px] text-emerald-400">CTR Draft Prepared</div>
            </div>

            {/* Azure Blob SAS Token Vault */}
            <div className="p-3 rounded-xl bg-surface border border-border space-y-1">
              <div className="flex justify-between items-center text-[10px] uppercase text-muted-foreground">
                <span>Azure Blob Vault</span>
                <Key className="w-3 h-3 text-emerald-500" />
              </div>
              <div className="text-emerald-500 font-bold">SAS 15-Min TTL</div>
              <div className="text-[10px] text-muted-foreground truncate">Encrypted Government KYC</div>
            </div>
          </div>

          {interactive && (
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setMaskState(!maskState);
                }}
                className="px-3 py-1 rounded-lg bg-surface border border-border text-[10px] font-bold text-foreground hover:border-accent hover:text-accent transition-colors"
              >
                Toggle PII SSN / TIN Masking
              </button>
              <span className="text-[10px] text-muted-foreground">FinCEN-Aligned Workflows</span>
            </div>
          )}
        </div>
      )}

      {/* 2. WEALTH MANAGEMENT PLATFORM (Live Auction & Family Asset Allocation) */}
      {projectId === "wealth-management" && (
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-2 text-emerald-500 font-bold">
              <DollarSign className="w-4 h-4" />
              <span>DYNAMIC AUCTION & ASSET ENGINE</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
              <Lock className="w-3 h-3 text-emerald-500" />
              <span>AES256 ENCRYPTED REDUX</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-auto">
            {/* Live Auction Counter-Bidding Box */}
            <div className="p-3 rounded-xl bg-surface border border-border space-y-2">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-muted-foreground uppercase">Current High Bid</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <Gavel className="w-3 h-3" />
                  <span>AUCTION ACTIVE</span>
                </span>
              </div>
              <div className="text-lg font-bold text-foreground">
                ${auctionBid.toLocaleString()} USD
              </div>
              <div className="text-[10px] text-muted-foreground">
                Latest: {bidHistory[0].bidder} ({bidHistory[0].time})
              </div>
            </div>

            {/* Family Asset Allocation */}
            <div className="p-3 rounded-xl bg-surface border border-border space-y-1.5">
              <div className="flex justify-between text-[10px] text-muted-foreground uppercase">
                <span>Family Asset Sharing</span>
                <span className="text-foreground font-bold">$14.2M Total</span>
              </div>
              <div>
                <div className="flex justify-between text-[10px] mb-0.5">
                  <span className="text-muted-foreground">Private Equity & Trust</span>
                  <span className="text-foreground font-semibold">55%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-surface-elevated overflow-hidden">
                  <div className="w-[55%] h-full bg-emerald-500 rounded-full" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] mb-0.5">
                  <span className="text-muted-foreground">Real Assets & Collector</span>
                  <span className="text-foreground font-semibold">45%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-surface-elevated overflow-hidden">
                  <div className="w-[45%] h-full bg-cyan-500 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {interactive && (
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <button
                onClick={handlePlaceBid}
                className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-bold text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all"
              >
                + Place $25,000 Counter-Bid
              </button>
              <span className="text-[10px] text-muted-foreground">Sub-50ms WebSocket Broadcast</span>
            </div>
          )}
        </div>
      )}

      {/* 3. HEALTHCARE & TELEMEDICINE (Clinical Telemetry & AI Decision Support) */}
      {projectId === "tele-critical-care" && (
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-2 text-cyan-500 font-bold">
              <Activity className="w-4 h-4 text-cyan-500" />
              <span>ICU TELEMETRY & AI DECISION SUPPORT</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-500 text-[10px] font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>AGORA WEBRTC LIVE</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 my-auto items-center">
            {/* ECG Waveform Stream */}
            <div className="sm:col-span-7 p-3 rounded-xl bg-surface border border-border space-y-2">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-muted-foreground">ECG LEAD II TELEMETRY</span>
                <span className="text-cyan-500 font-bold">78 BPM (STABLE)</span>
              </div>
              <div className="h-9 w-full overflow-hidden flex items-center text-cyan-500">
                <svg className="w-full h-full" viewBox="0 0 200 40" preserveAspectRatio="none">
                  <path
                    d="M0,20 L30,20 L35,5 L40,35 L45,15 L50,22 L55,20 L90,20 L95,5 L100,35 L105,15 L110,22 L115,20 L150,20 L155,5 L160,35 L165,15 L170,22 L175,20 L200,20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className="flex justify-between text-[10px] text-foreground font-semibold">
                <span>SpO2: 98%</span>
                <span>RESP: 16</span>
                <span>NIBP: 120/80</span>
              </div>
            </div>

            {/* AI Decision Support Box */}
            <div className="sm:col-span-5 p-3 rounded-xl bg-accent/5 border border-accent/20 space-y-1.5">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-accent">
                <Brain className="w-3.5 h-3.5" />
                <span>AI Clinical Assist</span>
              </div>
              <p className="text-[10px] text-muted-foreground leading-tight">
                No abnormal ischemic deltas detected across 12-hr baseline window.
              </p>
              <div className="text-[9px] font-bold text-green-500 uppercase">
                Firebase Session Locked
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-border text-[10px] text-muted-foreground">
            <span>Provider-to-Provider Sub-150ms Telemedicine</span>
            <span className="text-cyan-500 font-bold">HIPAA Compliant</span>
          </div>
        </div>
      )}

      {/* 4. POS & RETAIL MULTI-TENANT ERP (GST Billing & Warehouse Stock Decrement) */}
      {projectId === "pos-retail-system" && (
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-2 text-purple-400 font-bold">
              <ShoppingCart className="w-4 h-4" />
              <span>POS CHECKOUT & GODOWN STOCK DECREMENT</span>
            </div>
            <div className="flex items-center gap-1 text-[10px]">
              <span className="text-muted-foreground">Format:</span>
              <button
                onClick={() => setInvoiceFormat("thermal")}
                className={`px-1.5 py-0.5 rounded ${invoiceFormat === "thermal" ? "bg-purple-500 text-white font-bold" : "text-muted-foreground"}`}
              >
                Thermal
              </button>
              <button
                onClick={() => setInvoiceFormat("a4")}
                className={`px-1.5 py-0.5 rounded ${invoiceFormat === "a4" ? "bg-purple-500 text-white font-bold" : "text-muted-foreground"}`}
              >
                A4 PDF
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-auto">
            {/* Warehouse Stock Monitor */}
            <div className="p-3 rounded-xl bg-surface border border-border space-y-1">
              <div className="flex justify-between text-[10px] text-muted-foreground uppercase">
                <span>Central Godown Stock</span>
                <span className="text-green-500 font-bold">ACID Synced</span>
              </div>
              <div className="text-lg font-bold text-foreground">
                {godownStock} Units Available
              </div>
              <div className="text-[10px] text-muted-foreground">
                Auto-reduces immediately upon cashier checkout.
              </div>
            </div>

            {/* Active Invoice Format */}
            <div className="p-3 rounded-xl bg-surface border border-border space-y-1">
              <div className="flex justify-between text-[10px] text-muted-foreground uppercase">
                <span>Invoice Engine</span>
                <Printer className="w-3 h-3 text-purple-400" />
              </div>
              <div className="text-foreground font-bold text-xs">
                {invoiceFormat === "thermal" ? "80mm ESC/POS Thermal" : "A4 GST Compliant PDF"}
              </div>
              <div className="text-[10px] text-purple-400">
                CGST 9% + SGST 9% Calculated
              </div>
            </div>
          </div>

          {interactive && (
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <button
                onClick={handleCheckoutSale}
                className="px-3 py-1 rounded-lg bg-purple-500/10 border border-purple-500/30 text-[10px] font-bold text-purple-400 hover:bg-purple-500 hover:text-white transition-all"
              >
                Simulate POS Sale Checkout (-1 Unit)
              </button>
              <span className="text-[10px] text-muted-foreground">Multi-Tenant Isolated</span>
            </div>
          )}
        </div>
      )}

      {/* 5. INVENTORY MANAGEMENT PLATFORM (Shopify, Greenbits, QuickBooks Sync) */}
      {projectId === "inventory-management-platform" && (
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-2 text-amber-500 font-bold">
              <Package className="w-4 h-4" />
              <span>MULTI-CHANNEL INVENTORY & NODE-RED ETL</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/30 text-[10px] font-bold">
              STRIPE RECURRING BILLING
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2.5 my-auto">
            <div className="p-2.5 rounded-xl bg-surface border border-border text-center space-y-1">
              <span className="text-[10px] text-muted-foreground">Shopify</span>
              <div className="text-foreground font-bold text-xs">1,480 SKUs</div>
              <div className="text-[9px] text-emerald-500">Live Webhook</div>
            </div>
            <div className="p-2.5 rounded-xl bg-surface border border-border text-center space-y-1">
              <span className="text-[10px] text-muted-foreground">QuickBooks</span>
              <div className="text-foreground font-bold text-xs">Ledger Parity</div>
              <div className="text-[9px] text-emerald-500">Nightly CRON</div>
            </div>
            <div className="p-2.5 rounded-xl bg-surface border border-border text-center space-y-1">
              <span className="text-[10px] text-muted-foreground">Greenbits</span>
              <div className="text-foreground font-bold text-xs">POS Synced</div>
              <div className="text-[9px] text-emerald-500">Store Level</div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-border text-[10px] text-muted-foreground">
            <span>Node-RED Bulk Spreadsheet Ingestion (CSV / Excel)</span>
            <span className="text-amber-500 font-bold">Automated Audit</span>
          </div>
        </div>
      )}

      {/* 6. BEHAVIOR TRACKER (Offline-First ABA Multi-Timer & SQLite Delta) */}
      {projectId === "behavior-tracker" && (
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-2 text-emerald-500 font-bold">
              <Smartphone className="w-4 h-4" />
              <span>OFFLINE-FIRST ABA CLINICAL TIMERS</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold">
              {offlineStatus === "online" ? (
                <>
                  <Wifi className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-500">ONLINE (SYNCED)</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-amber-500">OFFLINE (14 QUEUED)</span>
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 my-auto">
            <div className="p-3 rounded-xl bg-surface border border-border space-y-1">
              <span className="text-[10px] text-muted-foreground uppercase">1-to-N Duration Multi-Timer</span>
              <div className="text-foreground font-bold text-sm">Target A: 04:28</div>
              <div className="text-[10px] text-emerald-500 font-semibold">Microsecond Accurate</div>
            </div>

            <div className="p-3 rounded-xl bg-surface border border-border space-y-1">
              <span className="text-[10px] text-muted-foreground uppercase">SQLite Delta Journal</span>
              <div className="text-foreground font-bold text-sm">Local Storage DB</div>
              <div className="text-[10px] text-muted-foreground">Conflict-free replay on network reconnect</div>
            </div>
          </div>

          {interactive && (
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setOfflineStatus(offlineStatus === "online" ? "offline" : "online");
                }}
                className="px-3 py-1 rounded-lg bg-surface border border-border text-[10px] font-bold text-foreground hover:border-accent hover:text-accent transition-colors"
              >
                Simulate Network Drop / Reconnect
              </button>
              <span className="text-[10px] text-muted-foreground">React Native Android / iOS</span>
            </div>
          )}
        </div>
      )}

      {/* 7. TELE-CARE COLLABORATIVE NETWORK (Doctor-to-Doctor Tele-ICU) */}
      {projectId === "tele-care-network" && (
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <Stethoscope className="w-4 h-4" />
              <span>DOCTOR-TO-DOCTOR TELE-ICU NETWORK</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-[10px] font-bold">
              EXCLUSIVE SESSION LOCK
            </span>
          </div>

          <div className="p-3 rounded-xl bg-surface border border-border space-y-2 my-auto">
            <div className="flex justify-between items-center text-[10px] text-muted-foreground">
              <span>Remote Intensivist (Doctor A)</span>
              <span className="text-cyan-400 font-bold">Sub-150ms WebRTC</span>
              <span>Bedside Team (Doctor B)</span>
            </div>
            <div className="p-2 rounded-lg bg-surface-elevated border border-border text-center font-bold text-foreground text-xs">
              Synchronized Radiology & Invasive BP Telemetry
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-border text-[10px] text-muted-foreground">
            <span>Agora SD-RTN Real-Time Infrastructure</span>
            <span className="text-cyan-400 font-bold">Audit-Logged Calls</span>
          </div>
        </div>
      )}

      {/* 8. ADMIN & OPERATIONS DASHBOARD (Vue.js & Azure Service Bus Job Matrix) */}
      {projectId === "admin-operations-dashboard" && (
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-2 text-pink-500 font-bold">
              <Layers className="w-4 h-4" />
              <span>VUE.JS JOB MATRIX & MICROSOFT SSO</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-pink-500/10 text-pink-500 border border-pink-500/30 text-[10px] font-bold">
              AZURE CLOUD
            </span>
          </div>

          <div className="p-3 rounded-xl bg-surface border border-border space-y-2 my-auto">
            <div className="flex justify-between text-[11px] text-foreground font-bold">
              <span>Async Batch Job Throughput</span>
              <span className="text-pink-500">4,820 Tasks / hr</span>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
              <div className="p-1.5 rounded-lg bg-surface-elevated border border-border">
                <div className="text-muted-foreground">Queued</div>
                <div className="text-foreground font-bold">24</div>
              </div>
              <div className="p-1.5 rounded-lg bg-surface-elevated border border-border">
                <div className="text-muted-foreground">Running</div>
                <div className="text-cyan-500 font-bold">18</div>
              </div>
              <div className="p-1.5 rounded-lg bg-surface-elevated border border-border">
                <div className="text-emerald-500 font-bold">4,778</div>
                <div className="text-muted-foreground">Success</div>
              </div>
              <div className="p-1.5 rounded-lg bg-surface-elevated border border-border">
                <div className="text-accent font-bold">0</div>
                <div className="text-muted-foreground">Failed</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-border text-[10px] text-muted-foreground">
            <span>Microsoft OAuth 2.0 Single Sign-On Verified</span>
            <span className="text-pink-500 font-bold">Vuetify & ApexCharts</span>
          </div>
        </div>
      )}
    </div>
  );
}
