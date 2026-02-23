export type Feedback = {
  correctPosition: number
  correctLetterWrongPosition: number
  incorrect: number
}

export type GuessResult = {
  guess: string
  feedback: Feedback
}

export type GameStatus = "playing" | "won" | "lost"