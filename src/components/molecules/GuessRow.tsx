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
    <div className="flex w-full flex-col lg:flex-row gap-2 lg:gap-0 lg:relative items-center justify-between">
      <div className="flex w-full gap-1 justify-center lg:mx-auto">
        {word.split("").map((l, i) => (
          <LetterBox key={i} letter={l} canChangeColor={true}/>
        ))}
      </div>

      <div className="flex justify-center lg:absolute lg:right-[-60%] lg:top-1/2 lg:-translate-y-1/2">
        <CounterBox color="green" value={feedback.correctPosition} />
        <CounterBox color="yellow" value={feedback.correctLetterWrongPosition} />
        <CounterBox color="red" value={feedback.incorrect} />
      </div>
    </div>
  )
}
