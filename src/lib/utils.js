import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString) {
  return dateString;
}

export function truncateText(text, maxLength = 120) {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}
