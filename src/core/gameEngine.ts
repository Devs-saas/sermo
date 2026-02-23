import { evaluateGuess } from "./evaluateGuess"
import { Dictionary } from "./dictionary"
import type { GuessResult, GameStatus } from "./types"

export class GameEngine {
  private secret: string
  private dictionary: Dictionary
  private maxAttempts: number
  private guesses: GuessResult[] = []
  private status: GameStatus = "playing"

  constructor(secret: string, dictionary: Dictionary, maxAttempts = 8) {
    this.secret = secret.toUpperCase()
    this.dictionary = dictionary
    this.maxAttempts = maxAttempts
  }

  submitGuess(guess: string): GuessResult {
    if (this.status !== "playing") {
      throw new Error("Game is already finished")
    }

    // normalizar com o dicionário
    const normalized = guess.toUpperCase()

    // verifica se é uma palavra válida como chute
    if (!this.dictionary.isValidGuess(normalized)) {
      throw new Error("Palavra inválida")
    }

    // avalia o chute e devolve o feedback
    const feedback = evaluateGuess(this.secret, normalized)

    const result: GuessResult = {
      guess: normalized,
      feedback,
    }

    // armazena o resultado do chute
    this.guesses.push(result)

    // verifica vitória
    if (feedback.correctPosition === this.secret.length) {
      this.status = "won"
    }
    // verifica derrota
    else if (this.guesses.length >= this.maxAttempts) {
      this.status = "lost"
    }

    return result
  }

  getGuesses(): GuessResult[] {
    return [...this.guesses]
  }

  getStatus(): GameStatus {
    return this.status
  }

  getRemainingAttempts(): number {
    return this.maxAttempts - this.guesses.length
  }

  getSecret(): string {
    return this.secret
  }
}
