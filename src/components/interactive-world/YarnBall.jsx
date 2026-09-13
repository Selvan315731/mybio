"use client";

import { motion } from "framer-motion";

export default function YarnBall({ yarn, onPointerDown }) {
  const { x, y, rotation = 0, color = "#f43f5e" } = yarn;

  return (
    <div
      onPointerDown={onPointerDown}
      style={{
        transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
      }}
      className="absolute top-0 left-0 cursor-grab active:cursor-grabbing z-25 select-none"
    >
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        {/* Shadow */}
        <ellipse cx="14" cy="25" rx="10" ry="2.5" fill="rgba(0,0,0,0.2)" />

        {/* Yarn Ball */}
        <circle cx="14" cy="14" r="11" fill={color} stroke="#be123c" strokeWidth="1.5" />

        {/* Thread lines overlay */}
        <path
          d="M6 14 C8 8, 20 8, 22 14 C20 20, 8 20, 6 14"
          stroke="#ffffff"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.6"
        />
        <path
          d="M14 6 C8 8, 8 20, 14 22 C20 20, 20 8, 14 6"
          stroke="#ffffff"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* Loose thread trail */}
        <path
          d="M22 18 C26 22, 27 26, 28 27"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
