import type { PersistedGame, PlayerStatistics } from "../core/types";

const STATS_STORAGE_KEY = 'stats';

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

export function saveGameStatistics(game: PersistedGame) : PlayerStatistics {
  const data = localStorage.getItem(STATS_STORAGE_KEY);

  const attemptsKey = game.attempts.length;
  const newPlayedGameAttempts = [0,0,0,0,0,0,0,0,0];

  if (game.status === 'lost') {
    newPlayedGameAttempts[attemptsKey] +=1
  } else {
    newPlayedGameAttempts[attemptsKey - 1] += 1;
  }

  let newStatistics: PlayerStatistics = {
    nGamesPlayed: 1,
    nGamesWon: game.status === "won" ? 1 : 0,
    playedGameAttempts: newPlayedGameAttempts,
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
    oldPlayedGameAttempts = [0,0,0,0,0,0,0,0,0];
  }

  if (game.status === 'lost') {
    oldPlayedGameAttempts[attemptsKey] +=1
  } else {
    oldPlayedGameAttempts[attemptsKey - 1] += 1;
  }

  const actualVictorySequence = game.status === "won" ? oldStats.actualVictorySequence + 1 : 0;
  const newBestVictorySequence = oldStats.bestVictorySequence >= actualVictorySequence
    ? oldStats.bestVictorySequence
    : actualVictorySequence

  newStatistics = {
    nGamesPlayed: oldStats.nGamesPlayed + 1,
    nGamesWon: oldStats.nGamesWon + (game.status === "won" ? 1 : 0),
    playedGameAttempts : oldPlayedGameAttempts,
    actualVictorySequence,
    bestVictorySequence: newBestVictorySequence
  }

  localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(newStatistics));
  return newStatistics;
}

export function loadStatistics() : PlayerStatistics | null {
  const data = localStorage.getItem(STATS_STORAGE_KEY);
  if (!data) return null
  return JSON.parse(data);
}