import { LetterBox } from "../atoms/LetterBox"
import { CounterBox } from "../atoms/CounterBox"
import type { GuessResult } from "../../core/types"

type Props = {
  guess: GuessResult;
  nLetters?: number;
}

export function GuessRow({ guess, nLetters }: Props) {
  const { guess: word, feedback } = guess;
  nLetters = nLetters ?? 5;

  return (
    <div className="flex w-full flex-col md:flex-row items-center justify-between">
      <div className="flex w-full gap-1 justify-center">
        {word.split("").map((l, i) => (
          <LetterBox key={i} letter={l} maxSize={100/nLetters}/>
        ))}
      </div>

      <div className="flex w-full md:gap-3 justify-center ">
        <CounterBox color="green" value={feedback.correctPosition} />
        <CounterBox color="yellow" value={feedback.correctLetterWrongPosition} />
        <CounterBox color="red" value={feedback.incorrect} />
      </div>
    </div>
  )
}
