"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import profileData from "@/data/profile.json";

export default function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleScrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-border bg-background py-8 px-4 sm:px-8 text-xs font-mono text-muted-foreground relative">
      <div className="max-w-7xl mx-auto">
        {/* Animated Gradient Separator Line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-accent/40 to-transparent mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start mb-6">
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-2">
            <div className="flex items-center gap-2 text-foreground">
              <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
              <span className="font-bold uppercase tracking-wider">
                {profileData.name}
              </span>
            </div>
            <p className="text-muted-foreground font-normal text-xs max-w-sm">
              {profileData.headline}
            </p>
            <div className="flex items-center gap-2 pt-0.5 text-emerald-500 text-[11px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span>SYSTEMS ONLINE</span>
            </div>
          </div>

          {/* Direct Communication Channels */}
          <div className="md:col-span-3 space-y-2">
            <span className="text-foreground uppercase tracking-wider text-[11px] block font-bold mb-3">
              Direct Channels
            </span>
            <div className="space-y-1.5 text-foreground/90">
              <a
                href={`mailto:${profileData.email}`}
                className="hover:text-accent transition-colors flex items-center gap-1.5 truncate"
              >
                <span>{profileData.email}</span>
              </a>
              <a
                href={profileData.phone ? `tel:${profileData.phone}` : "#"}
                className="hover:text-accent transition-colors flex items-center gap-1.5"
              >
                <span>{profileData.phone}</span>
              </a>
              <a
                href="#contact"
                className="text-accent font-bold hover:underline inline-block pt-1"
              >
                Direct Project Dispatch →
              </a>
            </div>
          </div>

          {/* Location & Timezone Clock */}
          <div className="md:col-span-3 space-y-2">
            <span className="text-foreground uppercase tracking-wider text-[11px] block font-bold mb-3">
              Location & Time
            </span>
            <div className="space-y-1 text-foreground/90">
              <p>{profileData.location}</p>
              <p className="text-accent font-bold">
                {time ? `${time} IST (UTC+5:30)` : "00:00:00 IST"}
              </p>
              <p className="text-[10px] text-muted-foreground pt-1">
                Open to Global Remote & Hybrid Roles
              </p>
            </div>
          </div>

          {/* Back to Top */}
          <div className="md:col-span-2 flex md:justify-end">
            <button
              onClick={handleScrollToTop}
              className="p-3 rounded-xl glass-panel border border-border hover:border-accent text-foreground flex items-center gap-2 transition-colors group shadow-sm font-bold"
              aria-label="Back to top"
            >
              <span className="text-[10px] uppercase tracking-wider">TOP </span>
              <ArrowUp className="w-3.5 h-3.5 text-accent group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Bottom Sub-footer without tech labels */}
        <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
          <p>© {new Date().getFullYear()} {profileData.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
