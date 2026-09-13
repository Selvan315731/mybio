"use client";

import { motion } from "framer-motion";
import { CAT_COLORS } from "./types";

export default function Cat({
  cat,
  isSelected,
  onPointerDown,
  onPointerUp,
  onClick,
}) {
  const {
    id,
    name,
    color = "orange",
    state = "idle",
    facing = "right",
    isDragged = false,
    dragType = "body", // 'body' | 'back_leg'
    dialogue = "",
    isBehindCard = false,
    turnCooldown = 0,
  } = cat;

  const palette = CAT_COLORS[color] || CAT_COLORS.orange;
  const isSleeping = state === "sleeping";
  const isWalking = state === "walking";
  const isRunning = state === "running" || state === "chasing";
  const isFighting = state === "fighting";
  const isStretching = state === "stretching";
  const isGrooming = state === "grooming";
  const isSitting = state === "sitting";
  const isPlaying = state === "playing";

  // Effect 1: Forward stride tilt calculation
  const forwardLeanAngle = isRunning
    ? (facing === "left" ? -6 : 6)
    : isWalking
    ? (facing === "left" ? -2.5 : 2.5)
    : 0;

  return (
    <div
      onPointerDown={(e) => onPointerDown && onPointerDown(e, cat)}
      onPointerUp={(e) => onPointerUp && onPointerUp(e, cat)}
      onClick={(e) => onClick && onClick(e, cat)}
      className="relative select-none cursor-grab active:cursor-grabbing group touch-none"
    >
      {/* Dialogue / Thought Bubble (Always Normal, Never Mirrored) */}
      {dialogue && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-surface/95 border border-border shadow-md text-[10px] font-mono font-bold text-foreground whitespace-nowrap z-30 pointer-events-none"
          style={{ direction: "ltr", textAlign: "center" }}
        >
          {dialogue}
        </motion.div>
      )}

      {/* Effect 3: Behind Cards Depth Occlusion & Translucent Frosted Glass */}
      {isBehindCard && !isDragged && (
        <div className="absolute -inset-1 rounded-xl bg-card/65 backdrop-blur-[2px] border border-accent/40 pointer-events-none -z-10 shadow-[inset_0_0_8px_rgba(0,0,0,0.5)] flex items-center justify-center">
          <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[8px] font-mono font-bold text-accent bg-background/90 px-1.5 py-0.2 rounded-full border border-accent/40 whitespace-nowrap shadow-sm">
            Behind Card 🤫
          </span>
        </div>
      )}

      {/* Effect 1: Forward Movement Running Dust Trail */}
      {(isWalking || isRunning) && !isDragged && (
        <motion.div
          animate={{
            opacity: [0.7, 0],
            x: facing === "right" ? [-2, -14] : [2, 14],
            y: [-1, -4],
            scale: [0.6, 1.2],
          }}
          transition={{ duration: 0.35, repeat: Infinity, ease: "easeOut" }}
          className="absolute bottom-1 pointer-events-none z-0"
          style={{
            left: facing === "right" ? "6px" : "42px",
          }}
        >
          <div className="w-2.5 h-1.5 rounded-full bg-accent/40 blur-[0.5px]" />
        </motion.div>
      )}

      {/* Effect 1: Sprint Streaks when running */}
      {isRunning && !isDragged && (
        <motion.div
          animate={{ opacity: [0.9, 0.1], x: facing === "right" ? [-4, -16] : [4, 16] }}
          transition={{ duration: 0.25, repeat: Infinity }}
          className="absolute top-2 pointer-events-none text-[10px] font-bold select-none text-accent z-0"
          style={{ left: facing === "right" ? "-8px" : "48px" }}
        >
          💨
        </motion.div>
      )}

      {/* Effect 2: Backward / Turnaround Skid Brake Puff */}
      {turnCooldown > 8 && !isDragged && (
        <motion.div
          initial={{ scale: 0.6, opacity: 0.95, y: 0 }}
          animate={{ scale: 1.25, opacity: 0, y: -5 }}
          transition={{ duration: 0.32 }}
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 pointer-events-none flex items-center gap-1 z-20"
        >
          <span className="text-[11px] leading-none select-none">💨</span>
          <div className="w-4 h-0.5 bg-foreground/40 rounded-full" />
        </motion.div>
      )}

      {/* Sleeping "z Z Z" bubbles (Always Normal) */}
      {isSleeping && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 1, 0], y: [-5, -20] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          className="absolute -top-6 right-0 text-xs font-mono font-bold text-accent z-30 pointer-events-none"
        >
          z Z z
        </motion.div>
      )}

      {/* Selected Indicator Aura */}
      {isSelected && (
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute -inset-2 rounded-full border-2 border-accent/80 bg-accent/15 blur-sm z-0 pointer-events-none"
        />
      )}

      {/* Main Cat SVG Illustration (Flipped horizontally based on facing direction, tilted with forward lean) */}
      <svg
        width="56"
        height="44"
        viewBox="0 0 56 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transform: `scaleX(${facing === "left" ? -1 : 1}) rotate(${forwardLeanAngle}deg)`,
          opacity: isBehindCard && !isDragged ? 0.7 : 1,
          filter: isBehindCard && !isDragged
            ? "blur(0.5px) brightness(0.85) drop-shadow(0 0 8px rgba(0,0,0,0.6))"
            : isDragged
            ? "drop-shadow(3px 6px 12px rgba(0,0,0,0.5))"
            : isFighting
            ? "drop-shadow(2px 4px 8px rgba(200,50,50,0.45))"
            : "drop-shadow(1px 3px 5px rgba(0,0,0,0.25))",
        }}
        className={`relative z-10 transition-transform duration-150 ${
          isDragged && dragType === "back_leg" ? "rotate-45" : ""
        }`}
      >
        {/* Shadow */}
        {!isDragged && (
          <ellipse
            cx="28"
            cy="41"
            rx={isSleeping ? "18" : "15"}
            ry="3"
            fill="rgba(0,0,0,0.18)"
          />
        )}

        {/* Tail */}
        <motion.path
          d={
            isSleeping
              ? "M14 34 C10 32, 8 36, 12 38"
              : isFighting
              ? "M12 28 C6 18, 4 14, 8 10"
              : "M12 30 C6 24, 6 16, 10 12"
          }
          stroke={palette.primary}
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
          animate={
            isSleeping
              ? { d: ["M14 34 C10 32, 8 36, 12 38", "M14 34 C10 33, 8 37, 12 39"] }
              : isFighting
              ? { rotate: [-10, 10, -10] }
              : isRunning
              ? { rotate: [15, -15, 15] }
              : { rotate: [-5, 8, -5] }
          }
          transition={{ duration: isFighting ? 0.2 : 1.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ originX: "14px", originY: "30px" }}
        />

        {/* Hind Leg (Back) */}
        {!isSleeping && (
          <motion.path
            d="M16 28 C14 34, 15 38, 17 40"
            stroke={palette.secondary}
            strokeWidth="4"
            strokeLinecap="round"
            animate={
              isWalking
                ? { d: ["M16 28 C14 34, 15 38, 17 40", "M16 28 C14 32, 17 36, 19 38"] }
                : isRunning
                ? { d: ["M16 28 C12 32, 10 36, 8 39", "M16 28 C16 34, 18 38, 20 40"] }
                : {}
            }
            transition={{ duration: 0.35, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {/* Body */}
        {isSleeping ? (
          // Curled up sleeping body
          <ellipse
            cx="26"
            cy="32"
            rx="16"
            ry="11"
            fill={palette.primary}
            stroke={palette.secondary}
            strokeWidth="1.5"
          />
        ) : isSitting ? (
          // Upright sitting body
          <path
            d="M16 36 C14 26, 20 20, 28 20 C34 20, 38 26, 36 36 C34 40, 18 40, 16 36 Z"
            fill={palette.primary}
            stroke={palette.secondary}
            strokeWidth="1.5"
          />
        ) : isStretching ? (
          // Arching stretched body
          <path
            d="M14 26 C20 18, 30 22, 38 32 C34 38, 16 36, 14 26 Z"
            fill={palette.primary}
            stroke={palette.secondary}
            strokeWidth="1.5"
          />
        ) : (
          // Standard walking / standing body
          <ellipse
            cx="26"
            cy="28"
            rx="15"
            ry="10"
            fill={palette.primary}
            stroke={palette.secondary}
            strokeWidth="1.5"
          />
        )}

        {/* Body Belly Patch */}
        <ellipse
          cx="27"
          cy={isSleeping ? "33" : "30"}
          rx="9"
          ry="6"
          fill={palette.belly}
          opacity="0.85"
        />

        {/* Tabby Stripes (if orange/gray/brown) */}
        {(color === "orange" || color === "gray" || color === "brown") && (
          <g stroke={palette.stripes} strokeWidth="1.5" strokeLinecap="round">
            <path d="M22 22 L22 26" />
            <path d="M26 21 L26 25" />
            <path d="M30 22 L30 26" />
          </g>
        )}

        {/* Fore Leg (Front) */}
        {!isSleeping && (
          <motion.path
            d={
              isGrooming
                ? "M34 26 C36 20, 38 18, 40 22"
                : isPlaying
                ? "M34 28 C38 24, 42 22, 44 26"
                : "M34 28 C35 34, 36 38, 37 40"
            }
            stroke={palette.primary}
            strokeWidth="4"
            strokeLinecap="round"
            animate={
              isWalking
                ? { d: ["M34 28 C35 34, 36 38, 37 40", "M34 28 C33 32, 31 36, 30 38"] }
                : isRunning
                ? { d: ["M34 28 C38 32, 42 36, 44 39", "M34 28 C32 34, 30 38, 28 40"] }
                : isGrooming
                ? { d: ["M34 26 C36 20, 38 18, 40 22", "M34 26 C36 18, 39 16, 41 20"] }
                : {}
            }
            transition={{ duration: 0.35, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {/* Head */}
        <circle
          cx={isSleeping ? "36" : isSitting ? "34" : "38"}
          cy={isSleeping ? "30" : isSitting ? "18" : "20"}
          r="9.5"
          fill={palette.primary}
          stroke={palette.secondary}
          strokeWidth="1.5"
        />

        {/* Ears */}
        <path
          d={
            isSleeping
              ? "M31 24 L34 18 L37 23 Z"
              : isSitting
              ? "M29 12 L33 6 L36 11 Z"
              : "M33 14 L37 8 L40 13 Z"
          }
          fill={palette.primary}
          stroke={palette.secondary}
          strokeWidth="1.2"
        />
        <path
          d={
            isSleeping
              ? "M33 23 L34 19 L36 22 Z"
              : isSitting
              ? "M31 11 L33 8 L35 11 Z"
              : "M35 13 L37 10 L39 13 Z"
          }
          fill={palette.ears}
        />

        <path
          d={
            isSleeping
              ? "M39 25 L43 20 L44 26 Z"
              : isSitting
              ? "M37 12 L41 7 L43 13 Z"
              : "M41 15 L45 9 L46 16 Z"
          }
          fill={palette.primary}
          stroke={palette.secondary}
          strokeWidth="1.2"
        />
        <path
          d={
            isSleeping
              ? "M40 25 L42 22 L43 25 Z"
              : isSitting
              ? "M39 12 L41 9 L42 12 Z"
              : "M42 14 L44 11 L45 15 Z"
          }
          fill={palette.ears}
        />

        {/* Eyes */}
        {isSleeping ? (
          // Sleeping curved eyes (^ ^)
          <g stroke={palette.secondary} strokeWidth="1.5" strokeLinecap="round">
            <path d="M34 29 C35 28, 36 28, 37 29" />
            <path d="M39 30 C40 29, 41 29, 42 30" />
          </g>
        ) : isFighting ? (
          // Fierce angry fighting eyes
          <g fill={palette.eyes}>
            <circle cx={isSitting ? "32" : "36"} cy={isSitting ? "17" : "19"} r="2" />
            <circle cx={isSitting ? "37" : "41"} cy={isSitting ? "17" : "19"} r="2" />
            <path d="M30 15 L35 17" stroke="#000" strokeWidth="1.2" />
            <path d="M43 15 L38 17" stroke="#000" strokeWidth="1.2" />
          </g>
        ) : (
          // Cute big anime cat eyes
          <g fill={palette.eyes}>
            <ellipse cx={isSitting ? "32" : "36"} cy={isSitting ? "18" : "20"} rx="2.4" ry="2.8" />
            <ellipse cx={isSitting ? "38" : "42"} cy={isSitting ? "18" : "20"} rx="2.4" ry="2.8" />
            {/* Eye pupil shines */}
            <circle cx={isSitting ? "32.5" : "36.5"} cy={isSitting ? "17.2" : "19.2"} r="0.8" fill="#ffffff" />
            <circle cx={isSitting ? "38.5" : "42.5"} cy={isSitting ? "17.2" : "19.2"} r="0.8" fill="#ffffff" />
          </g>
        )}

        {/* Nose & Whiskers */}
        <polygon
          points={
            isSitting
              ? "34.5,21 36.5,21 35.5,22.5"
              : isSleeping
              ? "37.5,32 39.5,32 38.5,33.5"
              : "38.5,23 40.5,23 39.5,24.5"
          }
          fill={palette.nose}
        />
        {/* Whiskers */}
        <g stroke={palette.secondary} strokeWidth="0.8" strokeLinecap="round" opacity="0.7">
          <line
            x1={isSitting ? "31" : "34"}
            y1={isSitting ? "21" : "23"}
            x2={isSitting ? "26" : "29"}
            y2={isSitting ? "20" : "22"}
          />
          <line
            x1={isSitting ? "31" : "34"}
            y1={isSitting ? "23" : "25"}
            x2={isSitting ? "26" : "29"}
            y2={isSitting ? "24" : "26"}
          />
          <line
            x1={isSitting ? "39" : "43"}
            y1={isSitting ? "21" : "23"}
            x2={isSitting ? "44" : "48"}
            y2={isSitting ? "20" : "22"}
          />
          <line
            x1={isSitting ? "39" : "43"}
            y1={isSitting ? "23" : "25"}
            x2={isSitting ? "44" : "48"}
            y2={isSitting ? "24" : "26"}
          />
        </g>
      </svg>

      {/* Name Label — Always LTR, Never Mirrored */}
      <div
        className="text-[9px] font-mono font-bold text-center tracking-wider text-muted-foreground group-hover:text-accent transition-colors"
        style={{ direction: "ltr", textAlign: "center" }}
      >
        {name}
      </div>
    </div>
  );
}
