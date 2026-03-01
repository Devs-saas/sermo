import type { PlayerStatistics } from "../core/types";
import { loadStatistics } from "../utils/storage";

export function usePlayerStatistics() {
  const playerStats = loadStatistics();

  if (!playerStats)
    return {
      nGamesPlayed: 0,
      nGamesWon: 0,
      playedGameAttempts: [0,0,0,0,0,0,0,0,0],
      actualVictorySequence: 0,
      bestVictorySequence: 0
    } as PlayerStatistics

  return playerStats
}