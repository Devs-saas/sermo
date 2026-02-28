import { useRef, useState, useCallback, useMemo, useEffect } from "react"
import { GameEngine } from "../core/gameEngine"
import { Dictionary } from "../core/dictionary"
import type { GuessResult, GameStatus } from "../core/types"
import { saveGame, loadGame, getDateKey, getTodayKey, saveGameStatistics } from "../utils/storage"
import { getDailyAnswer } from "../utils/getDailyAnswer"

type UseGameOptions = {
  maxAttempts?: number
}

export function useGame({
  maxAttempts = 8,
}: UseGameOptions) {

  const dictionary = useMemo(() => new Dictionary(), [])
  const gameKeyRef = useRef<string>(null)
  const engineRef = useRef<GameEngine>(null)
  const gameDateRef = useRef<string>(null)
  const secretRef = useRef<string>(null)

  const [guesses, setGuesses] = useState<GuessResult[]>([])
  const [status, setStatus] = useState<GameStatus>("playing")
  const [remainingAttempts, setRemainingAttempts] = useState(maxAttempts)
  const [error, setError] = useState<string | null>(null)


  useEffect(() => {
    console.log("Initializing game...")
    const today = new Date()
    gameDateRef.current = today.toISOString();
    const todayKey = getDateKey(today)

    const existing = loadGame(todayKey)

    if (existing) {
      gameKeyRef.current = todayKey
      engineRef.current = new GameEngine(existing.secret, dictionary, maxAttempts)
      existing.attempts.forEach(g => {
        engineRef.current?.submitGuess(g.guess)
      })

      secretRef.current = existing.secret
      setStatus(existing.status)
      setGuesses(existing.attempts)
      setRemainingAttempts(engineRef.current.getRemainingAttempts())
      syncState()
    } else {
      gameKeyRef.current = todayKey
      const scrt = getDailyAnswer(dictionary.getAnswersSet())
      engineRef.current = new GameEngine(scrt, dictionary, maxAttempts)

      secretRef.current = scrt
      syncState()
    }
  }, [])

  const syncState = useCallback(() => {
    const engine = engineRef.current
    if (engine) {
      setGuesses(engine.getGuesses())
      setStatus(engine.getStatus())
      setRemainingAttempts(engine.getRemainingAttempts())
    }
  }, [])

  const submitGuess = useCallback(
    (guess: string) => {
      try {
        setError(null)

        engineRef.current?.submitGuess(guess)
        syncState()

        saveGame(gameKeyRef.current??getTodayKey(),{
          date: new Date().toISOString(),
          secret: secretRef.current??"",
          attempts: engineRef.current?.getGuesses()??[],
          status: engineRef.current?.getStatus()??"playing",
        })

        if (engineRef.current?.getStatus() === "playing") return;

        saveGameStatistics({
          date: new Date().toISOString(),
          secret: secretRef.current??"",
          attempts: engineRef.current?.getGuesses()??[],
          status: engineRef.current?.getStatus()??"playing",
        });

      } catch (err) {
        console.error("Error submitting guess:", err)
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
    engineRef.current = new GameEngine(secretRef.current??"", dictionary, maxAttempts)
    setGuesses([])
    setStatus("playing")
    setRemainingAttempts(maxAttempts)
    setError(null)
  }, [secretRef, dictionary, maxAttempts, status])

  return {
    guesses,
    status,
    remainingAttempts,
    submitGuess,
    error,
    resetGame,
    isFinished: status !== "playing",
    secret: status === "playing" ? null : secretRef.current,
  }
}
