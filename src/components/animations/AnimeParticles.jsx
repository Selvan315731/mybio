"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/components/theme/ThemeProvider";

export default function AnimeParticles() {
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Create particles (glowing sparks / sakura petals)
    const particleCount = 28;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 1,
      speedX: (Math.random() - 0.5) * 0.6,
      speedY: Math.random() * 0.8 + 0.3,
      opacity: Math.random() * 0.6 + 0.2,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        if (p.y > height) {
          p.y = -10;
          p.x = Math.random() * width;
        }
        if (p.x > width) p.x = 0;
        if (p.x < 0) p.x = width;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        const isDark = document.documentElement.classList.contains("dark");
        ctx.fillStyle = isDark
          ? `rgba(244, 63, 94, ${p.opacity})` // Cyber Rose
          : `rgba(225, 29, 72, ${p.opacity * 0.7})`; // Manga Red

        ctx.shadowBlur = isDark ? 8 : 4;
        ctx.shadowColor = isDark ? "#f43f5e" : "#e11d48";

        // Draw small anime spark diamond
        ctx.beginPath();
        ctx.moveTo(0, -p.size * 1.5);
        ctx.lineTo(p.size, 0);
        ctx.lineTo(0, p.size * 1.5);
        ctx.lineTo(-p.size, 0);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-20 opacity-70"
    />
  );
}
