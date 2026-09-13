/**
 * BehaviorEngine.js — Smooth 2D Movement, Zero-Jerk Passing & Real DOM Spatial Simulation
 */

import {
  getVisibleDOMHidingSpots,
  findNearestDOMCard,
} from "./WorldGeometry";

export function createInitialWorldState(config) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const numCats = isMobile ? (config.mobileCatCount || 3) : Math.floor(Math.random() * 3) + 4;
  const numRats = isMobile ? (config.mobileRatCount || 1) : Math.floor(Math.random() * 2) + 2;
  const winWidth = typeof window !== "undefined" ? window.innerWidth : 1200;
  const winHeight = typeof window !== "undefined" ? window.innerHeight : 800;
  const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
  const docH = typeof document !== "undefined" ? Math.max(document.body.scrollHeight, 4200) : 4200;

  // Shuffle pool of cat and rat profiles for random variety on every session
  const shuffledCats = [...(config.cats || [])].sort(() => 0.5 - Math.random());
  const initialCats = (shuffledCats.length ? shuffledCats : config.cats).slice(0, numCats).map((catDef, idx) => {
    const startX = 60 + Math.random() * Math.max(100, winWidth - 180);
    
    // Spawn based on CURRENT VIEW POSITION & major document sections:
    // Cats 0 & 1 spawn right in current view so user immediately sees them
    // Other cats distributed across page sections (Projects, Architecture, Timeline)
    let startY;
    if (idx < 2) {
      startY = scrollY + 80 + Math.random() * (winHeight - 200);
    } else {
      const sectionOffset = (idx - 1) * (docH / Math.max(numCats, 3));
      startY = Math.min(docH - 120, Math.max(80, sectionOffset + Math.random() * 220));
    }

    return {
      ...catDef,
      id: `cat-${idx}-${Date.now()}`,
      x: startX,
      y: startY,
      spawnY: startY,
      vx: (Math.random() > 0.5 ? 1 : -1) * (0.8 + Math.random() * 0.5) * (catDef.speed || 1),
      vy: (Math.random() - 0.5) * 0.4 * (catDef.speed || 1),
      facing: Math.random() > 0.5 ? "right" : "left",
      state: "idle",
      stateTimer: Math.floor(Math.random() * 80) + 40,
      turnCooldown: 0,
      dialogue: "",
      isDragged: false,
      dragType: "body",
      isBehindCard: false,
      behindTimer: 0,
      behindCooldown: 600,
      targetYarn: false,
      targetRatId: null,
      lastKnownRatPos: null,
      memoryTimer: 0,
    };
  });

  const shuffledRats = [...(config.rats || [])].sort(() => 0.5 - Math.random());
  const initialRats = (shuffledRats.length ? shuffledRats : config.rats).slice(0, numRats).map((ratDef, idx) => {
    const startX = 80 + Math.random() * Math.max(100, winWidth - 200);
    const startY = idx === 0
      ? scrollY + 110 + Math.random() * (winHeight - 230)
      : Math.min(docH - 150, Math.max(150, (idx * (docH / 2.5)) + Math.random() * 200));

    return {
      ...ratDef,
      id: `rat-${idx}-${Date.now()}`,
      x: startX,
      y: startY,
      spawnY: startY,
      vx: (Math.random() > 0.5 ? 1.4 : -1.4) * (ratDef.speed || 1),
      vy: (Math.random() - 0.5) * 0.5 * (ratDef.speed || 1),
      facing: Math.random() > 0.5 ? "right" : "left",
      state: "idle",
      turnCooldown: 0,
      targetDOMSpot: null,
      stateTimer: 60,
      hideTimer: 0,
      dialogue: "",
      isDragged: false,
    };
  });

  const initialYarn = {
    x: Math.min(480, winWidth / 2),
    y: scrollY + Math.max(100, winHeight - 140),
    vx: 0,
    vy: 0,
    rotation: 0,
    color: "#f43f5e",
    isDragged: false,
  };

  return {
    cats: initialCats,
    rats: initialRats,
    yarn: initialYarn,
    selectedCatIds: [],
  };
}

export function updateWorldPhysics(
  world,
  config,
  mousePos,
  bounds = { width: 1200, height: 800, docHeight: 4500, scrollY: 0 }
) {
  const { width, docHeight = 4500 } = bounds;
  const minY = 65;
  const maxY = docHeight - 80;
  const domHidingSpots = getVisibleDOMHidingSpots();

  // 1. UPDATE YARN BALL
  let newYarn = { ...world.yarn };
  newYarn.x += newYarn.vx;
  newYarn.y += newYarn.vy;
  newYarn.vx *= 0.94;
  newYarn.vy *= 0.94;
  newYarn.rotation += newYarn.vx * 4;

  if (newYarn.x < 30) {
    newYarn.x = 30;
    newYarn.vx *= -0.6;
  }
  if (newYarn.x > width - 50) {
    newYarn.x = width - 50;
    newYarn.vx *= -0.6;
  }
  if (newYarn.y < minY) {
    newYarn.y = minY;
    newYarn.vy *= -0.6;
  }
  if (newYarn.y > maxY) {
    newYarn.y = maxY;
    newYarn.vy = 0;
  }

  // 2. UPDATE RATS WITH SMOOTH PASSING & 2D DOM TRAVERSAL
  const newRats = world.rats.map((rat) => {
    if (rat.isDragged) return rat;

    let {
      x,
      y,
      vx,
      vy,
      facing,
      state,
      stateTimer,
      hideTimer,
      turnCooldown,
      targetDOMSpot,
      dialogue,
      speed,
    } = rat;

    if (turnCooldown > 0) turnCooldown--;

    // Nearest cat proximity check
    let nearestCat = null;
    let nearestCatDist = 9999;

    for (const cat of world.cats) {
      const dist = Math.hypot(x - cat.x, y - cat.y);
      if (dist < nearestCatDist) {
        nearestCatDist = dist;
        nearestCat = cat;
      }
    }

    if (state !== "hiding" && state !== "peeking") {
      if (nearestCat && nearestCatDist < 200) {
        // Cat is nearby!
        const bestCard = findNearestDOMCard(x, y, domHidingSpots);

        if (bestCard && nearestCatDist < 65) {
          // Duck behind this DOM card!
          state = "hiding";
          targetDOMSpot = bestCard;
          hideTimer = Math.floor(Math.random() * 120) + 80;
          dialogue = "Behind the card! 🤫";
        } else {
          // Flee mode: calculate escape direction
          state = "fleeing";

          // If cat and rat are very close, evade laterally (Y-axis) to cleanly PASS each other without jerking!
          if (nearestCatDist < 55) {
            // Lateral pass
            vy = (y > nearestCat.y ? 1.5 : -1.5) * speed;
          } else {
            vy *= 0.8;
          }

          // Direction turning with deadband and cooldown to prevent 1-frame oscillation
          if (turnCooldown <= 0) {
            const dx = x - nearestCat.x;
            if (Math.abs(dx) > 25) {
              const shouldFaceRight = dx > 0;
              if ((shouldFaceRight && facing !== "right") || (!shouldFaceRight && facing !== "left")) {
                facing = shouldFaceRight ? "right" : "left";
                turnCooldown = 20; // Prevent turning back for 20 frames
              }
            }
          }

          vx = (facing === "right" ? 2.5 : -2.5) * speed;
          if (Math.random() < 0.04) dialogue = "Squeak!! 💨";
        }
      } else {
        // Normal 2D wandering across DOM layout spaces
        stateTimer--;
        if (stateTimer <= 0) {
          state = Math.random() < 0.65 ? "walking" : "idle";
          if (turnCooldown <= 0) {
            const dir = Math.random() > 0.5 ? 1 : -1;
            vx = dir * (0.9 + Math.random() * 0.6) * speed;
            facing = vx > 0 ? "right" : "left";
            // 2D gentle wander up and down across cards
            vy = (Math.random() - 0.5) * 1.2 * speed;
            turnCooldown = 25;
          }
          stateTimer = Math.floor(Math.random() * 80) + 40;
          dialogue = "";
        }
      }
    } else {
      // Hiding / Peeking behind DOM Card
      hideTimer--;
      vx = 0;
      vy = 0;
      if (hideTimer <= 30 && hideTimer > 0) {
        state = "peeking";
        if (Math.random() < 0.04) dialogue = "*peeking* 👀";
      } else if (hideTimer <= 0 && nearestCatDist > 130) {
        // Safe to emerge
        state = "walking";
        targetDOMSpot = null;
        vx = (Math.random() > 0.5 ? 1.2 : -1.2) * speed;
        facing = vx > 0 ? "right" : "left";
        turnCooldown = 20;
        dialogue = "Safe! 💨";
      }
    }

    // Apply 2D Movement
    if (state === "walking" || state === "fleeing") {
      x += vx;
      y += vy;
    }

    // Smooth Screen Boundaries
    if (x < 20) {
      x = 20;
      vx = Math.abs(vx);
      facing = "right";
      turnCooldown = 15;
    } else if (x > width - 60) {
      x = width - 60;
      vx = -Math.abs(vx);
      facing = "left";
      turnCooldown = 15;
    }

    const ratMinY = Math.max(minY, (rat.spawnY || y) - 350);
    const ratMaxY = Math.min(maxY, (rat.spawnY || y) + 350);

    if (y < ratMinY) {
      y = ratMinY;
      vy = Math.abs(vy);
    } else if (y > ratMaxY) {
      y = ratMaxY;
      vy = -Math.abs(vy);
    }

    return {
      ...rat,
      x,
      y,
      spawnY: rat.spawnY || y,
      vx,
      vy,
      facing,
      state,
      stateTimer,
      hideTimer,
      turnCooldown,
      targetDOMSpot,
      dialogue,
    };
  });

  // 3. UPDATE CATS WITH ZERO-JERK PASSING & 2D CLIMBING / DOM TRAVERSAL
  const newCats = world.cats.map((cat, idx) => {
    if (cat.isDragged) return cat;

    let {
      x,
      y,
      vx,
      vy,
      facing,
      state,
      stateTimer,
      turnCooldown = 0,
      behindTimer = 0,
      behindCooldown = 0,
      isBehindCard = false,
      dialogue,
      personality,
      speed,
      lastKnownRatPos,
      memoryTimer,
    } = cat;

    stateTimer--;
    if (turnCooldown > 0) turnCooldown--;
    if (memoryTimer > 0) memoryTimer--;
    if (behindCooldown > 0) behindCooldown--;
    if (behindTimer > 0) behindTimer--;

    // Cursor proximity: bringing cat forward to front ward immediately
    if (mousePos && mousePos.x >= 0 && mousePos.y >= 0) {
      const distToCursor = Math.hypot(x - mousePos.x, y - mousePos.y);
      if (distToCursor < 130) {
        // If cursor gets close, automatically bring cat forward to the front ward
        if (isBehindCard) {
          isBehindCard = false;
          behindTimer = 0;
          behindCooldown = 900; // Stay forward
          dialogue = "Here I am! 🐾";
        }

        if (distToCursor < 40 && state !== "fighting") {
          dialogue = "Purr! 🐾";
        } else if (distToCursor < 75 && state !== "fighting" && state !== "sleeping") {
          if (turnCooldown <= 0) {
            const shouldFaceRight = mousePos.x > x;
            facing = shouldFaceRight ? "right" : "left";
            turnCooldown = 15;
          }
          if (personality === "curious" || personality === "playful") {
            vx = (mousePos.x > x ? 1 : -1) * 0.9 * speed;
            vy = (mousePos.y > y ? 0.6 : -0.6) * speed;
            state = "walking";
          }
        }
      }
    }

    // Cat-vs-Cat proximity: spontaneous fight or hiss
    if (state !== "sleeping" && state !== "fighting" && state !== "chasing") {
      for (const otherCat of world.cats) {
        if (otherCat.id === cat.id || otherCat.isDragged) continue;
        const catDist = Math.hypot(x - otherCat.x, y - otherCat.y);
        if (catDist < 45) {
          // Very close — chance to start a fight
          if (Math.random() < 0.006) {
            state = "fighting";
            stateTimer = Math.floor(Math.random() * 90) + 60;
            dialogue = ["HISSS! 😾", "RAWR! 🐾", "SWAT! 💥"][Math.floor(Math.random() * 3)];
          } else if (Math.random() < 0.012) {
            dialogue = ["Hey! 😤", "Back off! 😾", "Mine! 🐱"][Math.floor(Math.random() * 3)];
          }
          break;
        }
      }
    }

    // Check for active visible rats
    let visibleRat = null;
    let visibleRatDist = 9999;

    for (const rat of newRats) {
      if (rat.state !== "hiding") {
        const dist = Math.hypot(x - rat.x, y - rat.y);
        if (dist < 260 && dist < visibleRatDist) {
          visibleRat = rat;
          visibleRatDist = dist;
        }
      }
    }

    // Smooth Chase & Passing Logic
    if (visibleRat && state !== "sleeping" && state !== "fighting") {
      state = "chasing";
      const dx = visibleRat.x - x;
      const dy = visibleRat.y - y;

      // Pass smoothly without flipping on 1 frame
      if (turnCooldown <= 0) {
        if (Math.abs(dx) > 30) {
          const shouldFaceRight = dx > 0;
          if ((shouldFaceRight && facing !== "right") || (!shouldFaceRight && facing !== "left")) {
            facing = shouldFaceRight ? "right" : "left";
            turnCooldown = 18;
          }
        }
      }

      vx = (facing === "right" ? 2.0 : -2.0) * speed;

      // Vertical 2D alignment towards target
      if (Math.abs(dy) > 15) {
        vy = (dy > 0 ? 1.0 : -1.0) * speed;
      } else {
        vy *= 0.8;
      }

      lastKnownRatPos = { x: visibleRat.x, y: visibleRat.y };
      memoryTimer = 120;
      dialogue = "A mouse! ⚡";
    } else if (!visibleRat && state === "chasing" && lastKnownRatPos && memoryTimer > 0) {
      // Rat ducked behind a card
      const distToMemory = Math.abs(x - lastKnownRatPos.x);
      if (distToMemory > 35) {
        if (turnCooldown <= 0) {
          facing = lastKnownRatPos.x > x ? "right" : "left";
          turnCooldown = 15;
        }
        vx = (lastKnownRatPos.x > x ? 1.2 : -1.2) * speed;
        dialogue = "Behind that card? 🧐";
      } else {
        state = "sitting";
        stateTimer = 50;
        dialogue = "Searching... 🐾";
      }
    }

    // Bat at Yarn Ball
    if (config.yarnEnabled && !visibleRat && state !== "sleeping" && state !== "fighting") {
      const distToYarn = Math.hypot(x - newYarn.x, y - newYarn.y);
      if (distToYarn < 65) {
        state = "playing";
        if (turnCooldown <= 0) {
          facing = newYarn.x > x ? "right" : "left";
          turnCooldown = 15;
        }
        newYarn.vx += (facing === "right" ? 1 : -1) * (1.8 + Math.random() * 2);
        newYarn.vy += (newYarn.y > y ? 1 : -1) * 1.5;
        if (Math.random() < 0.1) dialogue = "Got it! 🧶";
      }
    }

    // Autonomous 2D Wandering & State Transitions
    if (stateTimer <= 0 && state !== "chasing") {
      const rand = Math.random();
      if (state === "sleeping") {
        state = "stretching";
        stateTimer = 40;
        dialogue = "Yaaawn... 🥱";
      } else if (state === "stretching") {
        state = "sitting";
        stateTimer = 50;
        dialogue = "";
      } else if (state === "fighting") {
        state = "sitting";
        stateTimer = 60;
        dialogue = "Puff... 🐾";
      } else if (state === "playing") {
        state = "walking";
        stateTimer = 70;
        dialogue = "";
      } else if (state === "sitting" || state === "grooming") {
        state = rand < 0.5 ? "walking" : "idle";
        stateTimer = Math.floor(Math.random() * 90) + 50;
        dialogue = "";
      } else if (state === "walking") {
        if (rand < 0.25 && config.sleepingEnabled && (personality === "sleepy" || rand < 0.15)) {
          state = "sleeping";
          vx = 0;
          vy = 0;
          stateTimer = Math.floor(Math.random() * 180) + 120;
          dialogue = "";
        } else if (rand < 0.5) {
          state = rand < 0.75 ? "sitting" : "grooming";
          vx = 0;
          vy = 0;
          stateTimer = Math.floor(Math.random() * 70) + 40;
          dialogue = "";
        } else {
          if (turnCooldown <= 0) {
            const dir = Math.random() > 0.5 ? 1 : -1;
            vx = dir * (0.7 + Math.random() * 0.6) * speed;
            vy = (Math.random() - 0.5) * 1.0 * speed;
            facing = vx > 0 ? "right" : "left";
            turnCooldown = 20;
          }
          stateTimer = Math.floor(Math.random() * 100) + 50;
        }
      } else {
        state = rand < 0.6 ? "walking" : rand < 0.85 ? "sitting" : "grooming";
        if (turnCooldown <= 0) {
          const dir = Math.random() > 0.5 ? 1 : -1;
          vx = dir * (0.7 + Math.random() * 0.6) * speed;
          vy = (Math.random() - 0.5) * 1.0 * speed;
          facing = vx > 0 ? "right" : "left";
          turnCooldown = 20;
        }
        stateTimer = Math.floor(Math.random() * 90) + 40;
      }
    }

    // Apply 2D Movement
    if (state === "walking" || state === "chasing") {
      x += vx;
      y += vy;
    }

    // Smooth Screen Boundaries
    if (x < 30) {
      x = 30;
      vx = Math.abs(vx);
      facing = "right";
      turnCooldown = 18;
    } else if (x > width - 80) {
      x = width - 80;
      vx = -Math.abs(vx);
      facing = "left";
      turnCooldown = 18;
    }

    const catMinY = Math.max(minY, (cat.spawnY || y) - 350);
    const catMaxY = Math.min(maxY, (cat.spawnY || y) + 350);

    if (y < catMinY) {
      y = catMinY;
      vy = Math.abs(vy);
    } else if (y > catMaxY) {
      y = catMaxY;
      vy = -Math.abs(vy);
    }

    // Effect 3: Controlled Behind-Card Behavior:
    // Cats spend the vast MAXIMUM of their time in the FRONT WARD facing the user!
    // A cat only ever sneaks behind for a very brief peek (max ~2 seconds),
    // and then IMMEDIATELY steps forward. When dragged or clicked, it is always in the front ward.
    const isOverCard = domHidingSpots.some(
      (spot) =>
        x + 40 >= spot.left &&
        x + 10 <= spot.right &&
        y + 30 >= spot.top &&
        y + 10 <= spot.bottom
    );

    let nextIsBehindCard = isBehindCard;

    if (nextIsBehindCard) {
      // Cat is currently behind a card: check if timer expired, moved off card, or user interacted
      if (behindTimer <= 0 || !isOverCard || cat.isDragged) {
        // Automatically emerge and move to the front ward!
        nextIsBehindCard = false;
        behindTimer = 0;
        behindCooldown = 900; // Stay forward for at least ~30 seconds (maximum forward time)
        if (state !== "fighting" && !cat.isDragged && Math.random() < 0.3) {
          dialogue = "Back in front! 🐾";
        }
      }
    } else {
      // In front ward (default): maximum time spent here.
      // Only very rarely sneaks behind for a brief 2-second moment, only if over a card and cooldown is complete.
      if (isOverCard && behindCooldown <= 0 && state !== "fighting" && !cat.isDragged) {
        // Extremely rare sneak chance (happens at most once every few minutes)
        if (Math.random() < 0.002) {
          nextIsBehindCard = true;
          behindTimer = 60; // Max ~2 seconds only!
          dialogue = "Behind card! 🤫";
        }
      }
    }

    return {
      ...cat,
      x,
      y,
      spawnY: cat.spawnY || y,
      vx,
      vy,
      facing,
      state,
      stateTimer,
      turnCooldown,
      behindTimer,
      behindCooldown,
      isBehindCard: nextIsBehindCard,
      lastKnownRatPos,
      memoryTimer,
      dialogue,
    };
  });

  return {
    ...world,
    cats: newCats,
    rats: newRats,
    yarn: newYarn,
  };
}
