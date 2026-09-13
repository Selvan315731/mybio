"use client";

import { motion } from "framer-motion";
import { RAT_COLORS } from "./types";

export default function Rat({ rat }) {
  const {
    id,
    name,
    color = "gray",
    state = "idle",
    facing = "right",
    dialogue = "",
  } = rat;

  const palette = RAT_COLORS[color] || RAT_COLORS.gray;
  const isRunning = state === "running" || state === "fleeing";
  const isHiding = state === "hiding";
  const isPeeking = state === "peeking";

  if (isHiding) {
    // Hidden state: only tiny glowing eyes visible (still draggable)
    return (
      <motion.div
        className="relative select-none pointer-events-auto cursor-grab active:cursor-grabbing p-1"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <svg width="24" height="14" viewBox="0 0 24 14">
          <circle cx="8" cy="8" r="2.5" fill="#f43f5e" />
          <circle cx="16" cy="8" r="2.5" fill="#f43f5e" />
          <circle cx="8.5" cy="7.4" r="0.8" fill="#fff" opacity="0.7" />
          <circle cx="16.5" cy="7.4" r="0.8" fill="#fff" opacity="0.7" />
        </svg>
      </motion.div>
    );
  }

  if (isPeeking) {
    // Peeking state: just head and big ears barely visible above card (still draggable)
    return (
      <motion.div
        className="relative select-none pointer-events-auto cursor-grab active:cursor-grabbing"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Dialogue */}
        {dialogue && (
          <div
            className="absolute -top-6 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-surface/95 border border-border text-[9px] font-mono font-bold text-accent whitespace-nowrap z-30 shadow-sm pointer-events-none"
            style={{ direction: "ltr", textAlign: "center" }}
          >
            {dialogue}
          </div>
        )}
        <svg
          width="30"
          height="22"
          viewBox="0 0 30 22"
          fill="none"
          style={{ transform: `scaleX(${facing === "left" ? -1 : 1})` }}
        >
          {/* Just ears + top of head */}
          <circle cx="10" cy="10" r="5.5" fill={palette.body} />
          <circle cx="10" cy="10" r="3.5" fill={palette.ears} />
          <circle cx="22" cy="10" r="5.5" fill={palette.body} />
          <circle cx="22" cy="10" r="3.5" fill={palette.ears} />
          {/* Peeking eyes */}
          <circle cx="10" cy="18" r="2" fill={palette.eyes} />
          <circle cx="10.4" cy="17.6" r="0.6" fill="#fff" />
          <circle cx="20" cy="18" r="2" fill={palette.eyes} />
          <circle cx="20.4" cy="17.6" r="0.6" fill="#fff" />
        </svg>
      </motion.div>
    );
  }

  return (
    <div className="relative select-none pointer-events-auto cursor-grab active:cursor-grabbing group">
      {/* Dialogue / Squeak bubble (Always Normal, Never Mirrored) */}
      {dialogue && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute -top-6 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-surface/95 border border-border text-[9px] font-mono font-bold text-accent whitespace-nowrap z-30 shadow-sm"
          style={{ direction: "ltr", textAlign: "center" }}
        >
          {dialogue}
        </motion.div>
      )}

      {/* Rat SVG (Flipped horizontally based on facing direction) */}
      <svg
        width="36"
        height="24"
        viewBox="0 0 36 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transform: `scaleX(${facing === "left" ? -1 : 1})`,
          filter: "drop-shadow(1px 2px 4px rgba(0,0,0,0.3))",
        }}
        className="relative z-10"
      >
        {/* Shadow */}
        <ellipse cx="18" cy="22" rx="10" ry="2" fill="rgba(0,0,0,0.15)" />

        {/* Tail */}
        <motion.path
          d="M6 16 C2 12, 1 6, 4 4"
          stroke={palette.tail}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          animate={
            isRunning
              ? { d: ["M6 16 C2 12, 1 6, 4 4", "M6 16 C1 14, 0 10, 3 8"] }
              : { rotate: [-5, 10, -5] }
          }
          transition={{ duration: 0.3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Body */}
        <ellipse
          cx="16"
          cy="15"
          rx="10"
          ry="6.5"
          fill={palette.body}
          stroke="rgba(0,0,0,0.15)"
          strokeWidth="1"
        />
        <ellipse cx="17" cy="16" rx="6" ry="4" fill={palette.belly} opacity="0.8" />

        {/* Head */}
        <path
          d="M20 15 C22 11, 28 13, 30 16 C28 19, 22 19, 20 15 Z"
          fill={palette.body}
        />

        {/* Big Ears */}
        <circle cx="21" cy="9" r="4" fill={palette.body} />
        <circle cx="21" cy="9" r="2.5" fill={palette.ears} />

        {/* Eyes */}
        <circle cx="26" cy="13" r="1.3" fill={palette.eyes} />
        <circle cx="26.3" cy="12.7" r="0.4" fill="#ffffff" />

        {/* Snout & Whiskers */}
        <circle cx="31" cy="16" r="1" fill={palette.ears} />
        <g stroke={palette.body} strokeWidth="0.6" strokeLinecap="round" opacity="0.7">
          <line x1="28" y1="16" x2="33" y2="14" />
          <line x1="28" y1="17" x2="33" y2="18" />
        </g>

        {/* Paws */}
        <motion.path
          d="M12 19 L11 22 M22 19 L23 22"
          stroke={palette.ears}
          strokeWidth="2"
          strokeLinecap="round"
          animate={
            isRunning
              ? { d: ["M12 19 L11 22 M22 19 L23 22", "M12 19 L14 22 M22 19 L20 22"] }
              : {}
          }
          transition={{ duration: 0.15, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

