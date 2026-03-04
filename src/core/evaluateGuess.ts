import type { ColorState, Feedback, FeedbackPosition } from "./types"

export function evaluateGuess(secret: string, guess: string): Feedback {
  if (secret.length !== guess.length) {
    throw new Error("Secret and guess must have the same length")
  }

  const length = secret.length

  let correctPosition = 0
  let correctLetterWrongPosition = 0

  // Marca quais posições já foram usadas
  const secretUsed = new Array<boolean>(length).fill(false)
  const guessUsed = new Array<boolean>(length).fill(false)

  //contar posições corretas
  for (let i = 0; i < length; i++) {
    if (guess[i] === secret[i]) {
      correctPosition++
      secretUsed[i] = true
      guessUsed[i] = true
    }
  }

  //contar letras corretas na posição errada
  for (let i = 0; i < length; i++) {
    if (guessUsed[i]) continue

    for (let j = 0; j < length; j++) {
      if (secretUsed[j]) continue

      if (guess[i] === secret[j]) {
        correctLetterWrongPosition++
        secretUsed[j] = true
        guessUsed[i] = true
        break
      }
    }
  }

  const incorrect =
    length - correctPosition - correctLetterWrongPosition

  return {
    correctPosition,
    correctLetterWrongPosition,
    incorrect,
  }
}

export function evaluateGuessPositions(secret: string, guess: string): FeedbackPosition {
  if (secret.length !== guess.length) {
    throw new Error("Secret and guess must have the same length")
  }

  const length = secret.length
  const ret: FeedbackPosition = { positions: [] }
  ret.positions = new Array<ColorState>(length).fill("neutral")

  // Marca quais posições já foram usadas
  const secretUsed = new Array<boolean>(length).fill(false)
  const guessUsed = new Array<boolean>(length).fill(false)

  //contar posições corretas
  for (let i = 0; i < length; i++) {
    if (guess[i] === secret[i]) {
      ret.positions[i] = "right"
      secretUsed[i] = true
      guessUsed[i] = true
    }
  }

  //contar letras corretas na posição errada
  for (let i = 0; i < length; i++) {
    if (guessUsed[i]) continue

    for (let j = 0; j < length; j++) {
      if (secretUsed[j]) continue

      if (guess[i] === secret[j]) {
        ret.positions[i] = "wrong-placed"
        secretUsed[j] = true
        guessUsed[i] = true
        break
      }
    }
  }

  ret.positions = ret.positions.map(
    state => state === "neutral" ? "wrong" : state
  )

  return ret
}
