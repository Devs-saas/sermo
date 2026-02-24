import { GuessRow } from "../molecules/GuessRow"
import type { GuessResult } from "../../core/types"
import { WordInput } from "../molecules/WordInput"
import { LetterBox } from "../atoms/LetterBox"

type Props = {
  guesses: GuessResult[]
}

export function GameBoard({ guesses }: Props) {
  const remainingRows = 7 - guesses.length

  return (
    <div className="flex flex-col mx-auto max-w-md gap-2">
      {guesses.map((g, i) => (
        <GuessRow key={i} guess={g} />
      ))}
      <WordInput wordLength={5} onSubmit={(word) => console.log("Submit:", word)} />
        
      {Array.from({ length: remainingRows }).map((_, i) => (
        <div key={i} className="flex items-center justify-between opacity-50">
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, j) => (
              <LetterBox key={j} letter="" />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
