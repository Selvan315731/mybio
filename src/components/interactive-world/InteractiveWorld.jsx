"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Cat from "./Cat";
import Rat from "./Rat";
import YarnBall from "./YarnBall";
import initialConfig from "@/data/interactiveWorld.json";
import {
  createInitialWorldState,
  updateWorldPhysics,
} from "./BehaviorEngine";

export default function InteractiveWorld() {
  const [config, setConfig] = useState(initialConfig);
  const [world, setWorld] = useState(null);
  const [selectedCatIds, setSelectedCatIds] = useState([]);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [comicEffects, setComicEffects] = useState([]);

  const activeDragRef = useRef(null); // { type: 'cat' | 'rat' | 'yarn', id, dragType, grabOffsetX, grabOffsetY, currentX, currentY }
  const mousePosRef = useRef({ x: -100, y: -100 });
  const animFrameRef = useRef(null);
  const [docHeight, setDocHeight] = useState(4500);

  // Measure full document height so animals live on the actual scrollable webpage
  useEffect(() => {
    const updateDocHeight = () => {
      if (typeof document === "undefined") return;
      const h = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        4200
      );
      setDocHeight(h);
    };

    updateDocHeight();
    window.addEventListener("resize", updateDocHeight);
    const t1 = setTimeout(updateDocHeight, 600);
    const t2 = setTimeout(updateDocHeight, 2000);

    return () => {
      window.removeEventListener("resize", updateDocHeight);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Initialize World
  useEffect(() => {
    if (!config.enabled) return;
    const initialWorld = createInitialWorldState(config);
    setWorld(initialWorld);
  }, []);

  // Scroll reaction: light dialogue and subtle reaction on scroll without mutating coordinate frames
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const scrollDelta = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      if (Math.abs(scrollDelta) < 80) return;

      setWorld((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          cats: prev.cats.map((c) => {
            if (c.isDragged) return c;
            if (Math.random() < 0.25) {
              return {
                ...c,
                dialogue: scrollDelta > 0 ? "Exploring down! 📜" : "Heading up! 🐱",
                stateTimer: 45,
              };
            }
            return c;
          }),
        };
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Web Audio synthetic sounds (very subtle)
  const playSound = (type) => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === "purr") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === "swat") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(180, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.12);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      }
    } catch (e) {
      // Audio might be constrained before user interaction
    }
  };

  // Rock-Solid Document Drag & Drop System (Registered once on window)
  useEffect(() => {
    const handlePointerMove = (e) => {
      const scrollY = window.scrollY || 0;
      const clickDocX = e.clientX;
      const clickDocY = e.clientY + scrollY;
      mousePosRef.current = { x: clickDocX, y: clickDocY };

      if (!activeDragRef.current) return;

      const { type, id, grabOffsetX, grabOffsetY, dragType } = activeDragRef.current;
      const winW = typeof window !== "undefined" ? window.innerWidth : 1200;
      const totalH = docHeight || 4200;

      // Keep inside document boundaries
      const newX = Math.max(10, Math.min(winW - 65, clickDocX - grabOffsetX));
      const newY = Math.max(65, Math.min(totalH - 70, clickDocY - grabOffsetY));

      activeDragRef.current.currentX = newX;
      activeDragRef.current.currentY = newY;

      setWorld((prev) => {
        if (!prev) return prev;
        if (type === "cat") {
          return {
            ...prev,
            cats: prev.cats.map((c) =>
              c.id === id
                ? {
                    ...c,
                    x: newX,
                    y: newY,
                    spawnY: newY,
                    vx: 0,
                    vy: 0,
                    state: "dragged",
                    isDragged: true,
                    isBehindCard: false,
                    behindTimer: 0,
                    behindCooldown: 1200,
                    dragType: dragType || "body",
                  }
                : c
            ),
          };
        } else if (type === "rat") {
          return {
            ...prev,
            rats: prev.rats.map((r) =>
              r.id === id
                ? {
                    ...r,
                    x: newX,
                    y: newY,
                    spawnY: newY,
                    vx: 0,
                    vy: 0,
                    state: "fleeing",
                    isDragged: true,
                  }
                : r
            ),
          };
        } else if (type === "yarn" && prev.yarn) {
          return {
            ...prev,
            yarn: {
              ...prev.yarn,
              x: newX,
              y: newY,
              vx: 0,
              vy: 0,
              isDragged: true,
            },
          };
        }
        return prev;
      });
    };

    const handlePointerUpGlobal = () => {
      if (!activeDragRef.current) return;
      const { type, id, currentX, currentY } = activeDragRef.current;
      activeDragRef.current = null;
      playSound("purr");

      setWorld((prev) => {
        if (!prev) return prev;
        if (type === "cat") {
          return {
            ...prev,
            cats: prev.cats.map((c) =>
              c.id === id
                ? {
                    ...c,
                    x: currentX,
                    y: currentY,
                    spawnY: currentY,
                    vx: (Math.random() > 0.5 ? 1 : -1) * 0.4,
                    vy: 0,
                    state: "sitting",
                    isDragged: false,
                    isBehindCard: false,
                    behindTimer: 0,
                    behindCooldown: 1200,
                    dialogue: "Landed! 🐾",
                    stateTimer: 60,
                  }
                : c
            ),
          };
        } else if (type === "rat") {
          return {
            ...prev,
            rats: prev.rats.map((r) =>
              r.id === id
                ? {
                    ...r,
                    x: currentX,
                    y: currentY,
                    spawnY: currentY,
                    vx: (Math.random() > 0.5 ? 1.2 : -1.2),
                    vy: 0,
                    state: "walking",
                    isDragged: false,
                    dialogue: "Dropped! 💨",
                    stateTimer: 45,
                  }
                : r
            ),
          };
        } else if (type === "yarn" && prev.yarn) {
          return {
            ...prev,
            yarn: {
              ...prev.yarn,
              x: currentX,
              y: currentY,
              vx: (Math.random() - 0.5) * 2,
              vy: 1,
              isDragged: false,
            },
          };
        }
        return prev;
      });
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerup", handlePointerUpGlobal);
    window.addEventListener("pointercancel", handlePointerUpGlobal);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUpGlobal);
      window.removeEventListener("pointercancel", handlePointerUpGlobal);
    };
  }, [docHeight]);

  // Main 60fps Animation Loop (requestAnimationFrame)
  useEffect(() => {
    if (!config.enabled || !world) return;

    let lastTick = performance.now();

    const tick = (now) => {
      if (now - lastTick >= 33) {
        lastTick = now;

        setWorld((prevWorld) => {
          if (!prevWorld) return prevWorld;
          const bounds = {
            width: typeof window !== "undefined" ? window.innerWidth : 1200,
            height: typeof window !== "undefined" ? window.innerHeight : 800,
            docHeight: docHeight || 4200,
            scrollY: typeof window !== "undefined" ? window.scrollY : 0,
          };
          return updateWorldPhysics(prevWorld, config, mousePosRef.current, bounds);
        });
      }

      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animFrameRef.current);
  }, [config, world !== null, docHeight]);

  // Handle pointer down on Cat
  const handleCatPointerDown = (e, cat) => {
    e.preventDefault();
    e.stopPropagation();
    const scrollY = window.scrollY || 0;
    const clickDocX = e.clientX;
    const clickDocY = e.clientY + scrollY;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const clickX = e.clientX - rect.left;

    const isBackLeg = clickX < 20 && clickY > 24;
    const dragType = isBackLeg ? "back_leg" : "body";

    activeDragRef.current = {
      type: "cat",
      id: cat.id,
      grabOffsetX: clickDocX - cat.x,
      grabOffsetY: clickDocY - cat.y,
      currentX: cat.x,
      currentY: cat.y,
      dragType,
    };
    playSound("purr");

    setWorld((prev) => ({
      ...prev,
      cats: prev.cats.map((c) =>
        c.id === cat.id
          ? {
              ...c,
              state: "dragged",
              isDragged: true,
              isBehindCard: false,
              behindTimer: 0,
              behindCooldown: 1200,
              dragType,
              dialogue: isBackLeg ? "*meow wiggle!*" : "*picked up!* 🐾",
            }
          : c
      ),
    }));
  };

  // Handle pointer down on Rat
  const handleRatPointerDown = (e, rat) => {
    e.preventDefault();
    e.stopPropagation();
    const scrollY = window.scrollY || 0;
    const clickDocX = e.clientX;
    const clickDocY = e.clientY + scrollY;

    activeDragRef.current = {
      type: "rat",
      id: rat.id,
      grabOffsetX: clickDocX - rat.x,
      grabOffsetY: clickDocY - rat.y,
      currentX: rat.x,
      currentY: rat.y,
      dragType: "body",
    };
    playSound("purr");

    setWorld((prev) => ({
      ...prev,
      rats: prev.rats.map((r) =>
        r.id === rat.id
          ? {
              ...r,
              state: "fleeing",
              isDragged: true,
              dialogue: "Eek!! 💨",
            }
          : r
      ),
    }));
  };

  // Handle pointer down on Yarn Ball
  const handleYarnPointerDown = (e) => {
    if (!world?.yarn) return;
    e.preventDefault();
    e.stopPropagation();
    const scrollY = window.scrollY || 0;
    const clickDocX = e.clientX;
    const clickDocY = e.clientY + scrollY;

    activeDragRef.current = {
      type: "yarn",
      id: "yarn",
      grabOffsetX: clickDocX - world.yarn.x,
      grabOffsetY: clickDocY - world.yarn.y,
      currentX: world.yarn.x,
      currentY: world.yarn.y,
      dragType: "body",
    };

    setWorld((prev) => ({
      ...prev,
      yarn: {
        ...prev.yarn,
        isDragged: true,
      },
    }));
  };

  // Handle Cat Click / Multi-Selection
  const handleCatClick = (e, cat) => {
    e.stopPropagation();
    // Clicking brings cat immediately to the front ward
    setWorld((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        cats: prev.cats.map((c) =>
          c.id === cat.id
            ? {
                ...c,
                isBehindCard: false,
                behindTimer: 0,
                behindCooldown: 1200,
                dialogue: "Here I am! 🐾",
                stateTimer: 50,
              }
            : c
        ),
      };
    });

    if (e.shiftKey) {
      setSelectedCatIds((prev) =>
        prev.includes(cat.id) ? prev.filter((id) => id !== cat.id) : [...prev, cat.id]
      );
    } else {
      setSelectedCatIds((prev) =>
        prev.includes(cat.id) && prev.length === 1 ? [] : [cat.id]
      );
    }
  };

  // Make Selected Cats Fight
  const handleMakeFight = () => {
    if (selectedCatIds.length < 2 || !world) return;
    playSound("swat");

    const firstCat = world.cats.find((c) => c.id === selectedCatIds[0]);
    if (firstCat) {
      setComicEffects((prev) => [
        ...prev,
        { id: Date.now(), text: "POW! 💥", x: firstCat.x + 20, y: firstCat.y - 30 },
      ]);
    }

    setWorld((prev) => ({
      ...prev,
      cats: prev.cats.map((c) =>
        selectedCatIds.includes(c.id)
          ? {
              ...c,
              state: "fighting",
              dialogue: "SWAT! 🐾",
              stateTimer: 120,
            }
          : c
      ),
    }));
  };

  // Separate Fighting Cats
  const handleSeparate = () => {
    playSound("purr");
    setSelectedCatIds([]);
    setWorld((prev) => ({
      ...prev,
      cats: prev.cats.map((c) => ({
        ...c,
        state: "sitting",
        dialogue: "Peace! ✨",
        stateTimer: 60,
      })),
    }));
  };

  // Reset World
  const handleResetWorld = () => {
    setSelectedCatIds([]);
    setWorld(createInitialWorldState(config));
  };

  // Update Cat / Rat Counts
  const handleUpdateCatCount = (delta) => {
    const nextCount = Math.min(config.maxCats, Math.max(1, config.catCount + delta));
    const nextConfig = { ...config, catCount: nextCount };
    setConfig(nextConfig);
    setWorld(createInitialWorldState(nextConfig));
  };

  const handleUpdateRatCount = (delta) => {
    const nextCount = Math.min(config.maxRats, Math.max(0, config.ratCount + delta));
    const nextConfig = { ...config, ratCount: nextCount };
    setConfig(nextConfig);
    setWorld(createInitialWorldState(nextConfig));
  };

  if (!config.enabled || !world) return null;

  return (
    <>
      {/* Living Interactive Animal Canvas Layer (Document Space) */}
      <div
        className="pointer-events-none absolute top-0 left-0 w-full z-35 overflow-hidden select-none"
        style={{ height: docHeight || "100%" }}
      >
        {/* Comic Action Bubbles */}
        <AnimatePresence>
          {comicEffects.map((eff) => (
            <motion.div
              key={eff.id}
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ scale: [0.2, 1.3, 1], opacity: 1, y: -30 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              onAnimationComplete={() =>
                setComicEffects((prev) => prev.filter((e) => e.id !== eff.id))
              }
              style={{ left: eff.x, top: eff.y }}
              className="absolute z-50 px-3 py-1 rounded-full bg-yellow-400 border-2 border-black font-display font-black text-xs text-black shadow-[3px_3px_0px_#000]"
            >
              {eff.text}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Rolling Yarn Ball */}
        {config.yarnEnabled && world.yarn && (
          <div className="pointer-events-auto touch-none">
            <YarnBall yarn={world.yarn} onPointerDown={handleYarnPointerDown} />
          </div>
        )}

        {/* Rats Layer (Can hide behind DOM cards or scurry across spaces) */}
        {world.rats.map((rat) => (
          <div
            key={rat.id}
            onPointerDown={(e) => handleRatPointerDown(e, rat)}
            style={{
              position: "absolute",
              left: `${rat.x}px`,
              top: `${rat.y}px`,
              zIndex: rat.isDragged ? 70 : rat.state === "hiding" ? 8 : 25,
            }}
            className="pointer-events-auto cursor-grab active:cursor-grabbing touch-none"
          >
            <Rat rat={rat} />
          </div>
        ))}

        {/* Cats Layer */}
        {world.cats.map((cat) => (
          <div
            key={cat.id}
            style={{
              position: "absolute",
              left: `${cat.x}px`,
              top: `${cat.y}px`,
              zIndex: cat.isDragged ? 70 : cat.isBehindCard ? 18 : 40,
            }}
            className="pointer-events-auto touch-none"
          >
            <Cat
              cat={cat}
              isSelected={selectedCatIds.includes(cat.id)}
              onPointerDown={handleCatPointerDown}
              onClick={handleCatClick}
            />
          </div>
        ))}
      </div>
    </>
  );
}
