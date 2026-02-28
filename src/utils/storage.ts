import type { PersistedGame, PlayerStatistics } from "../core/types";

const STATS_STORAGE_KEY = 'stats';

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

export function saveGameStatistics(game: PersistedGame) : PlayerStatistics {
  const data = localStorage.getItem(STATS_STORAGE_KEY);

  let newStatistics: PlayerStatistics = {
    nGamesPlayed: 1,
    nGamesWon: game.status === "won" ? 1 : 0,
    playedGameAttempts:[game.attempts.length],
    actualVictorySequence: 1,
    bestVictorySequence: 1
  }

  if (!data) {
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(newStatistics))
    return newStatistics;
  }

  const oldStats = JSON.parse(data) as PlayerStatistics;

  let oldPlayedGameAttempts = oldStats?.playedGameAttempts;
  if (!oldPlayedGameAttempts) {
    oldPlayedGameAttempts = [];
  }

  oldPlayedGameAttempts.push(game.attempts.length)

  const newBestVictorySequence = oldStats.bestVictorySequence >= oldStats.actualVictorySequence + 1
    ? oldStats.bestVictorySequence
    : oldStats.actualVictorySequence + 1

  newStatistics = {
    nGamesPlayed: oldStats.nGamesPlayed + 1,
    nGamesWon: oldStats.nGamesWon + (game.status === "won" ? 1 : 0),
    playedGameAttempts : oldPlayedGameAttempts,
    actualVictorySequence: oldStats.actualVictorySequence + 1,
    bestVictorySequence: newBestVictorySequence
  }

  return newStatistics;
}

export function loadStatistics() : PlayerStatistics | null {
  const data = localStorage.getItem(STATS_STORAGE_KEY);
  if (!data) return null
  return JSON.parse(data);
}