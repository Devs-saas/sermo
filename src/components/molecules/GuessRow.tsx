import { LetterBox } from "../atoms/letterBox"
import { CounterBox } from "../atoms/CounterBox"
import type { GuessResult } from "../../core/types"

type Props = {
  guess: GuessResult
}

export function GuessRow({ guess }: Props) {
  const { guess: word, feedback } = guess

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-1">
        {word.split("").map((l, i) => (
          <LetterBox key={i} letter={l} />
        ))}
      </div>

      <div className="flex gap-3">
        <CounterBox color="green" value={feedback.correctPosition} />
        <CounterBox color="yellow" value={feedback.correctLetterWrongPosition} />
        <CounterBox color="red" value={feedback.incorrect} />
      </div>
    </div>
  )
}
