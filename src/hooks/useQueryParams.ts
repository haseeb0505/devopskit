"use client";

/**
 * useQueryParams — lightweight URL query-param helper for static-export Next.js.
 *
 * Uses window.location / window.history directly (no next/navigation) so it
 * works under `output: "export"` without Suspense boundaries.
 */

export function getParam(key: string, fallback: string): string {
  if (typeof window === "undefined") return fallback;
  return new URLSearchParams(window.location.search).get(key) ?? fallback;
}

export function getNumericParam(key: string, fallback: number): number {
  const raw = getParam(key, "");
  const n = Number(raw);
  return raw !== "" && !isNaN(n) ? n : fallback;
}

export function setParams(updates: Record<string, string>): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  Object.entries(updates).forEach(([k, v]) => params.set(k, v));
  window.history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);
}
