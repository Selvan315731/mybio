"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  Phone,
  Github,
  Linkedin,
  Copy,
  Check,
  Send,
  FileText,
  Sparkles,
  MessageSquare,
  AlertCircle,
  Loader2,
  ExternalLink,
} from "lucide-react";
import socialData from "@/data/social.json";
import profileData from "@/data/profile.json";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "Enterprise Platform Architecture",
    message: "",
    botField: "",
  });
  const [status, setStatus] = useState("idle"); // 'idle' | 'submitting' | 'success' | 'error'
  const [statusMessage, setStatusMessage] = useState("");

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(socialData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const getFormattedBody = () => {
    return (
      `Hello Thamaraiselvan,\n\n` +
      `I am reaching out through your portfolio regarding: ${formState.subject}\n\n` +
      `Name / Organization: ${formState.name || "[Your Name]"}\n` +
      `Email Address: ${formState.email || "[Your Email]"}\n` +
      `Project Area: ${formState.subject}\n\n` +
      `Requirements Scope / Message:\n${formState.message || "[Your Project Details]"}\n`
    );
  };

  const handleOpenGmail = () => {
    const su = encodeURIComponent(`[Project Scope] ${formState.subject} - from ${formState.name || "Client"}`);
    const body = encodeURIComponent(getFormattedBody());
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${socialData.email}&su=${su}&body=${body}`;
    window.open(gmailUrl, "_blank");
  };

  const handleOpenDefaultMail = () => {
    const su = encodeURIComponent(`[Project Scope] ${formState.subject} - from ${formState.name || "Client"}`);
    const body = encodeURIComponent(getFormattedBody());
    window.location.href = `mailto:${socialData.email}?subject=${su}&body=${body}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) return;

    setStatus("submitting");
    setStatusMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setStatus("success");
        setStatusMessage(
          data.message ||
          "Your transmission has been processed! If this is your first time, check your inbox for FormSubmit activation."
        );
      } else {
        setStatus("error");
        setStatusMessage(
          data.error ||
          "Form gateway requires one-time activation. Click 'Open in Gmail' below to dispatch your message immediately without delay!"
        );
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setStatusMessage(
        "Network transmission error. Click 'Open in Gmail' or 'Mail App' below to dispatch directly."
      );
    }
  };

  const whatsappUrl =
    socialData.whatsapp ||
    `https://wa.me/918870230519?text=${encodeURIComponent(
      "Hello Thamaraiselvan, I reviewed your enterprise portfolio and would like to discuss an opportunity."
    )}`;

  return (
    <section id="contact" className="py-24 px-4 sm:px-8 border-t border-border bg-background relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[750px] h-[400px] bg-accent/15 blur-[160px] rounded-t-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Consultation & Direct Contact</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-foreground tracking-tight">
            Have a Complex Product to Build?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Reach out directly for enterprise architecture, high-scale full-stack development, or technical consulting. Direct email and instant channels are active.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <a
              href={`mailto:${socialData.email}`}
              className="px-8 py-3.5 rounded-xl bg-accent text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-accent/90 transition-all shadow-[0_0_25px_var(--accent-glow)] flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>Direct Email</span>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-xl bg-emerald-600/90 text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-emerald-600 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pt-6 border-t border-border/60">
          {/* Left Column: Direct Communication Channels */}
          <div className="lg:col-span-6 space-y-5">
            <div>
              <h3 className="text-xl font-bold text-foreground">
                Direct Communication Channels
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">
                Available for full-stack engineering roles, enterprise platform architecture, and specialized consulting across RegTech, FinTech, and Healthcare.
              </p>
            </div>

            {/* Communication Cards */}
            <div className="space-y-3">
              {/* Email Card */}
              <div className="p-4 rounded-xl bg-surface border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
                <div className="flex items-center gap-3 truncate">
                  <div className="w-9 h-9 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-accent" />
                  </div>
                  <div className="truncate">
                    <div className="text-[10px] font-mono text-muted-foreground uppercase font-bold">
                      Primary Email
                    </div>
                    <span className="text-xs sm:text-sm font-mono text-foreground font-semibold truncate block">
                      {socialData.email}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleCopyEmail}
                    className="px-3 py-1.5 rounded-lg bg-background hover:bg-surface border border-border text-xs font-mono text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-500 font-bold">COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>COPY</span>
                      </>
                    )}
                  </button>
                  <a
                    href={`mailto:${socialData.email}`}
                    className="px-3 py-1.5 rounded-lg bg-accent/15 hover:bg-accent/25 border border-accent/40 text-xs font-mono text-accent font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <span>COMPOSE</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* WhatsApp Card */}
              <div className="p-4 rounded-xl bg-surface border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
                <div className="flex items-center gap-3 truncate">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="truncate">
                    <div className="text-[10px] font-mono text-emerald-400 uppercase font-bold flex items-center gap-1.5">
                      <span>WhatsApp Direct</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    <span className="text-xs sm:text-sm font-mono text-foreground font-semibold truncate block">
                      {profileData.phone || socialData.phone}
                    </span>
                  </div>
                </div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-xs font-mono text-emerald-400 font-bold flex items-center justify-center gap-1.5 transition-colors shrink-0"
                >
                  <span>CHAT NOW</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Phone Call Card */}
              <div className="p-4 rounded-xl bg-surface border border-border flex items-center justify-between gap-3 shadow-sm">
                <div className="flex items-center gap-3 truncate">
                  <div className="w-9 h-9 rounded-lg bg-surface border border-border flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-accent" />
                  </div>
                  <div className="truncate">
                    <div className="text-[10px] font-mono text-muted-foreground uppercase font-bold">
                      Direct Phone
                    </div>
                    <span className="text-xs sm:text-sm font-mono text-foreground font-semibold truncate block">
                      {profileData.phone || socialData.phone}
                    </span>
                  </div>
                </div>
                <a
                  href={`tel:${profileData.phone || socialData.phone}`}
                  className="px-3 py-1.5 rounded-lg bg-background hover:bg-surface border border-border text-xs font-mono text-accent font-bold flex items-center gap-1.5 transition-colors shrink-0"
                >
                  <span>CALL</span>
                </a>
              </div>
            </div>



            <div className="p-3 rounded-xl bg-surface/50 border border-border text-[11px] font-mono text-muted-foreground flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <span>Response SLA: Inquiries answered promptly within 2–4 hours during business days.</span>
            </div>
          </div>

          {/* Right Column: Direct Project Scope Dispatch Form */}
          <div className="lg:col-span-6 p-7 rounded-2xl bg-surface/90 border border-border relative shadow-xl backdrop-blur-md">
            <h3 className="text-lg font-display font-black text-foreground mb-1">
              Direct Project Scope Dispatch
            </h3>
            <p className="text-xs font-mono text-muted-foreground mb-5">
              Drop an architectural inquiry or requirements scope directly to <span className="text-accent font-semibold">{socialData.email}</span>.
            </p>

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-4"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-display font-black text-foreground">
                    Inquiry Ready & Dispatched
                  </h4>
                  <p className="text-xs font-mono text-foreground/80 leading-relaxed max-w-md mx-auto">
                    {statusMessage ||
                      "Your transmission has been processed! For 100% immediate delivery, you can also send it directly via Gmail or WhatsApp below."}
                  </p>
                  <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5">
                    <button
                      onClick={handleOpenGmail}
                      className="px-4 py-2.5 rounded-xl bg-accent text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-md hover:bg-accent/90 transition-all"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Send via Gmail (Pre-filled)</span>
                    </button>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Send on WhatsApp</span>
                    </a>
                    <button
                      onClick={() => setStatus("idle")}
                      className="px-4 py-2.5 rounded-xl bg-surface border border-border text-xs font-mono font-bold text-foreground hover:border-accent transition-colors"
                    >
                      Reset Form
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form key="form" onSubmit={handleSubmit} className="space-y-3.5 font-mono text-xs">
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs space-y-2"
                    >
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                        <div>{statusMessage}</div>
                      </div>
                      <div className="pt-1 flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={handleOpenGmail}
                          className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-100 font-bold flex items-center gap-1 transition-colors"
                        >
                          <Mail className="w-3 h-3" />
                          <span>Dispatch via Gmail Directly</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleOpenDefaultMail}
                          className="px-3 py-1.5 rounded-lg bg-surface border border-border text-foreground hover:text-white flex items-center gap-1 transition-colors"
                        >
                          <span>Open in Mail App</span>
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Honeypot Bot Trap (Invisible to humans, caught if automated bots fill it) */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="botField"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formState.botField}
                      onChange={(e) => setFormState({ ...formState, botField: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-muted-foreground uppercase tracking-wider mb-1 text-[10px] font-bold">
                      Your Name / Organization *
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Acme Health / Product Lead"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors shadow-inner"
                    />
                  </div>

                  <div>
                    <label className="block text-muted-foreground uppercase tracking-wider mb-1 text-[10px] font-bold">
                      Your Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="lead@enterprise.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors shadow-inner"
                    />
                  </div>

                  <div>
                    <label className="block text-muted-foreground uppercase tracking-wider mb-1 text-[10px] font-bold">
                      Project Area / Subject
                    </label>
                    <select
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:border-accent transition-colors shadow-inner cursor-pointer"
                    >
                      <option value="Enterprise Platform Architecture">Enterprise Platform Architecture</option>
                      <option value="Full-Stack Web / Mobile Development">Full-Stack Web / Mobile Development</option>
                      <option value="RegTech / Compliance / FinTech System">RegTech / Compliance / FinTech System</option>
                      <option value="Healthcare Telemetry / Critical Care">Healthcare Telemetry / Critical Care</option>
                      <option value="POS / Inventory ERP Integration">POS / Inventory ERP Integration</option>
                      <option value="Direct Consulting / Full-Time Role">Direct Consulting / Full-Time Role</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-muted-foreground uppercase tracking-wider mb-1 text-[10px] font-bold">
                      Requirements Scope / Message *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Describe your architectural workflows, tech stack requirements, or project timelines..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors resize-none shadow-inner"
                    />
                  </div>

                  <div className="pt-2 space-y-2.5">
                    {/* Primary Submit Button */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={handleOpenGmail}
                        className="py-3 px-4 rounded-xl bg-accent text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-accent/90 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_var(--accent-glow)]"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Send via Gmail</span>
                      </button>

                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="py-3 px-4 rounded-xl bg-surface hover:bg-surface/80 border border-border hover:border-accent text-foreground font-mono text-xs font-bold uppercase tracking-wider disabled:opacity-60 transition-all flex items-center justify-center gap-2"
                      >
                        {status === "submitting" ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Dispatching...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5 text-accent" />
                            <span>Transmit via Form</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground pt-0.5">
                      <span>Direct recipient: selvan315731@gmail.com</span>
                      <button
                        type="button"
                        onClick={handleOpenDefaultMail}
                        className="hover:text-accent underline flex items-center gap-1 transition-colors"
                      >
                        <span>Default Mail Client</span>
                        <ArrowUpRight className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
