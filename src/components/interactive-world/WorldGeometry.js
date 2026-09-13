/**
 * WorldGeometry.js — Dynamic Real-DOM Spatial Geometry, Card Hiding & Surface Engine
 */

/**
 * Scans the actual webpage DOM for visible cards, containers, and sections that serve as hiding spots
 */
export function getVisibleDOMHidingSpots() {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return [];
  }

  const spots = [];
  // Target cards, panels, and distinct containers across the portfolio
  const candidates = document.querySelectorAll(
    "article, .rounded-2xl, .rounded-3xl, .p-6, .p-8, .p-7, [data-cursor-project], .hud-corner, section"
  );

  const viewWidth = window.innerWidth;
  const viewHeight = window.innerHeight;

  const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
  const scrollX = typeof window !== "undefined" ? window.scrollX : 0;

  candidates.forEach((el, idx) => {
    const rect = el.getBoundingClientRect();

    // Check if element is reasonably sized
    if (rect.width >= 120 && rect.height >= 70) {
      const docTop = rect.top + scrollY;
      const docLeft = rect.left + scrollX;
      const docBottom = rect.bottom + scrollY;
      const docRight = rect.right + scrollX;

      spots.push({
        id: `dom-spot-${idx}`,
        left: docLeft,
        right: docRight,
        top: docTop,
        bottom: docBottom,
        width: rect.width,
        height: rect.height,
        centerX: docLeft + rect.width / 2,
        centerY: docTop + rect.height / 2,
        // Peeking coordinates
        peekX: docLeft + 20,
        peekY: docBottom - 20,
        topPeekY: docTop - 12,
      });
    }
  });

  return spots;
}

/**
 * Finds the closest visible DOM card for a rat to run and hide behind
 */
export function findNearestDOMCard(x, y, spots) {
  if (!spots || spots.length === 0) return null;

  let nearest = null;
  let minDist = 999999;

  for (const spot of spots) {
    const dist = Math.hypot(x - spot.centerX, y - spot.centerY);
    if (dist < minDist) {
      minDist = dist;
      nearest = spot;
    }
  }

  return nearest;
}

/**
 * Checks if a point (rat) is currently hidden behind a DOM card boundary
 */
export function isPointInsideDOMCard(x, y, spot) {
  if (!spot) return false;
  return (
    x >= spot.left - 20 &&
    x <= spot.right + 20 &&
    y >= spot.top - 20 &&
    y <= spot.bottom + 20
  );
}
