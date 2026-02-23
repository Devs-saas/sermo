import type { PersistedGame } from "../core/types";

export function getTodayKey(): string {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");

  return `game-${yyyy}-${mm}-${dd}`;
}

export function saveGame(game: PersistedGame) {
  localStorage.setItem(getTodayKey(), JSON.stringify(game));
}

export function loadGame(): PersistedGame | null {
  const data = localStorage.getItem(getTodayKey());
  if (!data) return null;
  return JSON.parse(data);
}
