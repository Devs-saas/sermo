import type { Feedback } from "./types"

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
