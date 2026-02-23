import { useRef, useState, useCallback, useMemo } from "react"
import { GameEngine } from "../core/gameEngine"
import { Dictionary } from "../core/dictionary"
import type { GuessResult, GameStatus } from "../core/types"
import { getDailyAnswer } from "../utils/getDailyAnswer"

type UseGameOptions = {
  dictionary: Dictionary
  maxAttempts?: number
}

export function useGame({
  dictionary,
  maxAttempts = 7,
}: UseGameOptions) {
  // Seleciona palavra do dia apenas uma vez
  const secret = useMemo(() => {
    return getDailyAnswer(dictionary.getAnswersSet())
  }, [dictionary])

  const engineRef = useRef<GameEngine>(
    new GameEngine(secret, dictionary, maxAttempts)
  )

  const [guesses, setGuesses] = useState<GuessResult[]>([])
  const [status, setStatus] = useState<GameStatus>("playing")
  const [remainingAttempts, setRemainingAttempts] = useState(maxAttempts)
  const [error, setError] = useState<string | null>(null)

  const syncState = useCallback(() => {
    const engine = engineRef.current
    setGuesses(engine.getGuesses())
    setStatus(engine.getStatus())
    setRemainingAttempts(engine.getRemainingAttempts())
  }, [])

  const submitGuess = useCallback(
    (guess: string) => {
      try {
        setError(null)

        engineRef.current.submitGuess(guess)
        syncState()
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError("Unexpected error")
        }
      }
    },
    [syncState]
  )

  const resetGame = useCallback(() => {
    engineRef.current = new GameEngine(secret, dictionary, maxAttempts)
    setGuesses([])
    setStatus("playing")
    setRemainingAttempts(maxAttempts)
    setError(null)
  }, [secret, dictionary, maxAttempts])

  return {
    guesses,
    status,
    remainingAttempts,
    submitGuess,
    error,
    resetGame,
  }
}
