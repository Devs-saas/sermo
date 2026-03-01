import type { ColorState } from "./types";

export const colorStates: Record<ColorState, string> = {
  "neutral"     : "bg-[var(--brand-cream)]",
  "right"       : "bg-[var(--brand-selected-green)]",
  "wrong-placed": "bg-[var(--brand-selected-yellow)]",
  "wrong"       : "bg-[var(--brand-selected-red)]"
}