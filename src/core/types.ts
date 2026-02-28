export type Feedback = {
  correctPosition: number
  correctLetterWrongPosition: number
  incorrect: number
}

export type GuessResult = {
  guess: string
  feedback: Feedback
}

export type PersistedGame = {
  date: string;
  secret: string;
  attempts: GuessResult[];
  status: GameStatus;
};


export type GameStatus = "playing" | "won" | "lost"

export type PlayerStatistics = {
  nGamesPlayed: number
  nGamesWon: number
  playedGameAttempts: number[]
  actualVictorySequence: number
  bestVictorySequence: number
}