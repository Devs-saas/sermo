import { GuessRow } from "../molecules/GuessRow"
import { WordInput } from "../molecules/WordInput"
import { LetterBox } from "../atoms/LetterBox"
import { useGame } from "../../hooks/useGame"
import { useState } from "react";
import { ToggleSwitch } from "../atoms/ToggleSwitch";
import { ResultModal } from "../molecules/ResultModal";

export function GameBoard() {
  const gameHook = useGame({maxAttempts: 8})
  const [resultOpen, setResultOpen] = useState(true)
  const [seeSolution, setSeeSolution] = useState(false)

  console.log(seeSolution)

  return (
    <div className="flex flex-col w-[60vw] mx-auto md:max-w-lg gap-2">

      <div className="text-xs text-white/70">seeSolution: {String(seeSolution)}</div>

      {gameHook.guesses.map((g, i) => (
        <GuessRow key={i} guess={g} />
      ))}

      
      {!gameHook.isFinished && <WordInput wordLength={5} onSubmit={gameHook.submitGuess} />}

      {Array.from({ length: gameHook.remainingAttempts - 1}).map((_, i) => (
        <div key={i} className="flex w-full items-center justify-center opacity-60">
          <div className="flex gap-1 w-full">
            {Array.from({ length: 5 }).map((_, j) => (
              <LetterBox key={j} letter="" />
            ))}
          </div>
        </div>
      ))}

      {(gameHook.isFinished || true && resultOpen) && (
        <ResultModal 
          nAttempts={gameHook.guesses.length}
          isWinner={gameHook.status === "won"}
          answer={gameHook.secret || "?????"}
          onClose={() => setResultOpen(false)}
        />
      )}
    </div>
  )
}
