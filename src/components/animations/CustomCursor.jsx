"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import siteData from "@/data/site.json";

export default function CustomCursor() {
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState("default");
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 350 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (!siteData.theme.enableCursor) return;

    // Disable on touch devices or reduced motion
    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouch || prefersReducedMotion) return;

    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest("[data-cursor]");
      const projectTarget = e.target.closest("[data-cursor-project]");
      const linkTarget = e.target.closest("a, button, [role='button']");

      if (projectTarget) {
        setCursorVariant("project");
        setCursorText("VIEW\nPROJECT");
      } else if (target) {
        const text = target.getAttribute("data-cursor-text") || "";
        const variant = target.getAttribute("data-cursor") || "hover";
        setCursorVariant(variant);
        setCursorText(text);
      } else if (linkTarget) {
        setCursorVariant("hover");
        setCursorText("");
      } else {
        setCursorVariant("default");
        setCursorText("");
      }
    };

    const handleMouseLeaveWindow = () => setIsVisible(false);
    const handleMouseEnterWindow = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Primary Follower */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:flex items-center justify-center rounded-full mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: cursorVariant === "project" ? 88 : cursorVariant === "hover" ? 48 : 12,
          height: cursorVariant === "project" ? 88 : cursorVariant === "hover" ? 48 : 12,
          backgroundColor: cursorVariant === "project" ? "#ffffff" : cursorVariant === "hover" ? "rgba(255,255,255,0.2)" : "#ffffff",
          borderColor: cursorVariant === "hover" ? "#ffffff" : "transparent",
          borderWidth: cursorVariant === "hover" ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        {cursorVariant === "project" && (
          <span className="text-[10px] font-mono font-bold tracking-widest text-black text-center uppercase leading-tight select-none">
            {cursorText}
          </span>
        )}
      </motion.div>
    </>
  );
}
