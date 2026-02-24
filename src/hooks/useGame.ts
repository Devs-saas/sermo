import { useRef, useState, useCallback, useMemo, useEffect } from "react"
import { GameEngine } from "../core/gameEngine"
import { Dictionary } from "../core/dictionary"
import type { GuessResult, GameStatus } from "../core/types"
import { getDailyAnswer } from "../utils/getDailyAnswer"
import { saveGame, loadGame } from "../utils/storage"

type UseGameOptions = {
  maxAttempts?: number
}

export function useGame({
  maxAttempts = 7,
}: UseGameOptions) {
  const dictionary = useMemo(() => new Dictionary(), [])

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
  const [isLoaded, setIsLoaded] = useState(false)

  const syncState = useCallback(() => {
    const engine = engineRef.current
    setGuesses(engine.getGuesses())
    setStatus(engine.getStatus())
    setRemainingAttempts(engine.getRemainingAttempts())
  }, [])

  // Restaurar jogo salvo ao montar
  useEffect(() => {
    const saved = loadGame()

    if (saved) {
      const restoredEngine = new GameEngine(secret, dictionary, maxAttempts)

      saved.attempts.forEach(g => {
        restoredEngine.submitGuess(g.guess)
      })

      engineRef.current = restoredEngine
      syncState()
    }

    setIsLoaded(true)
  }, [secret, dictionary, maxAttempts, syncState])

  const submitGuess = useCallback(
    (guess: string) => {
      try {
        if (status !== "playing") return

        setError(null)

        engineRef.current.submitGuess(guess)
        syncState()

        saveGame({
          date: new Date().toISOString(),
          secret,
          attempts: engineRef.current.getGuesses(),
          status: engineRef.current.getStatus(),
        })
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError("Unexpected error")
        }
      }
    },
    [status, syncState]
  )

  const resetGame = useCallback(() => {
    engineRef.current = new GameEngine(secret, dictionary, maxAttempts)
    setGuesses([])
    setStatus("playing")
    setRemainingAttempts(maxAttempts)
    setError(null)
  }, [secret, dictionary, maxAttempts, status])

  return {
    guesses,
    status,
    remainingAttempts,
    submitGuess,
    error,
    resetGame,
    isLoaded,
    isFinished: status !== "playing",
    secret: status === "playing" ? null : secret,
  }
}
