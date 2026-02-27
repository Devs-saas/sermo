import type { PersistedGame } from "../core/types";

export function getDateKey(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `game-${yyyy}-${mm}-${dd}`;
}


export function getTodayKey(): string {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");

  return `game-${yyyy}-${mm}-${dd}`;
}

export function saveGame(key: string, game: PersistedGame) {
  localStorage.setItem(key, JSON.stringify(game));
}

export function loadGame(key: string): PersistedGame | null {
  const data = localStorage.getItem(key);
  if (!data) return null;
  return JSON.parse(data);
}
