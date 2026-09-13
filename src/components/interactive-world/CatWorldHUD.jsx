"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Swords,
  RotateCcw,
  Volume2,
  VolumeX,
  Plus,
  Minus,
  X,
  Settings,
  Shield,
  Heart,
} from "lucide-react";

export default function CatWorldHUD({
  config,
  selectedCatCount,
  onMakeFight,
  onSeparate,
  onResetWorld,
  onUpdateCatCount,
  onUpdateRatCount,
  onToggleSound,
  soundEnabled,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2.5 font-mono">
      {/* Multi-Cat Selection Action Bar */}
      <AnimatePresence>
        {selectedCatCount >= 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="p-3 rounded-2xl glass-panel-elevated border border-accent shadow-2xl flex items-center gap-2 backdrop-blur-xl"
          >
            <span className="text-xs font-bold text-foreground pl-1">
              Selected Cats: {selectedCatCount}
            </span>
            <button
              onClick={onMakeFight}
              className="px-3 py-1.5 rounded-xl bg-accent text-white text-xs font-bold uppercase tracking-wider hover:bg-accent-hover transition-colors flex items-center gap-1.5 shadow-[0_0_15px_var(--accent-glow)]"
            >
              <Swords className="w-3.5 h-3.5" />
              <span>MAKE THEM FIGHT</span>
            </button>
            <button
              onClick={onSeparate}
              className="px-3 py-1.5 rounded-xl bg-surface border border-border text-foreground hover:border-accent text-xs font-bold uppercase transition-colors"
            >
              SEPARATE
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Settings Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="p-5 rounded-2xl hud-corner glass-panel-elevated border border-border shadow-2xl space-y-4 w-80 backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="font-bold text-foreground text-xs uppercase tracking-wider">
                  Cat & Rat World Settings
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-surface text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cat Count Controls */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-foreground font-semibold">Active Cats (1–10)</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onUpdateCatCount(-1)}
                  className="p-1 rounded-lg bg-surface border border-border hover:border-accent text-foreground"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="font-bold text-accent w-4 text-center">
                  {config.catCount}
                </span>
                <button
                  onClick={() => onUpdateCatCount(1)}
                  className="p-1 rounded-lg bg-surface border border-border hover:border-accent text-foreground"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Rat Count Controls */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-foreground font-semibold">Active Rats (0–3)</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onUpdateRatCount(-1)}
                  className="p-1 rounded-lg bg-surface border border-border hover:border-accent text-foreground"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="font-bold text-accent w-4 text-center">
                  {config.ratCount}
                </span>
                <button
                  onClick={() => onUpdateRatCount(1)}
                  className="p-1 rounded-lg bg-surface border border-border hover:border-accent text-foreground"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Features Checkboxes */}
            <div className="space-y-2 pt-2 border-t border-border text-[11px] text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>Autonomous Roaming</span>
                <span className="text-emerald-500 font-bold">Enabled</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Rat Evasive Chase AI</span>
                <span className="text-emerald-500 font-bold">Enabled</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Yarn Ball Physics</span>
                <span className="text-emerald-500 font-bold">Enabled</span>
              </div>
            </div>

            {/* Reset / Sound Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-border">
              <button
                onClick={onResetWorld}
                className="flex-1 py-2 rounded-xl bg-surface border border-border hover:border-accent text-foreground text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5 text-accent" />
                <span>Reset World</span>
              </button>
              <button
                onClick={onToggleSound}
                className="p-2 rounded-xl bg-surface border border-border text-foreground hover:border-accent transition-colors"
                title="Toggle Sound"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-accent" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle Unobtrusive Pill Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3.5 py-2 rounded-2xl glass-panel-elevated border border-border hover:border-accent text-foreground text-xs font-bold flex items-center gap-2 shadow-lg transition-all hover:scale-105 active:scale-95"
      >
        <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
        <span>🐱 CAT MODE ({config.catCount})</span>
      </button>
    </div>
  );
}
