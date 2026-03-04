import { LetterBox } from "../atoms/LetterBox"
import { CounterBox } from "../atoms/CounterBox"
import type { ColorState, GuessResult } from "../../core/types"
import { useEffect, useState } from "react";

type Props = {
  guess: GuessResult;
  nLetters?: number;
  updateKeyboardColors: (key: string, color: ColorState) => void
}

export function GuessRow({ guess, nLetters, updateKeyboardColors }: Props) {
  const { guess: word, feedback } = guess;
  nLetters = nLetters ?? 5;
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if(feedback.correctPosition === 5) {
      setIsComplete(true);
      for(let i = 0; i < word.length; i++) {
        updateKeyboardColors(word[i], "right")
      }
    } else setIsComplete(false);
  }, [guess])

  return (
    <div className="flex w-full flex-col lg:flex-row gap-2 lg:gap-0 lg:relative items-center justify-between">
      <div className="flex w-full gap-1 justify-center lg:mx-auto">
        {word.split("").map((l, i) => (
          <LetterBox colorStateProp={isComplete ? "right" : undefined} key={i} letter={l} canChangeColor={true} updateKeyboardColors={updateKeyboardColors}/>
        ))}
      </div>

      <div className="flex w-full lg:w-auto justify-center lg:absolute lg:-right-65 lg:top-1/2 lg:-translate-y-1/2">
        <CounterBox color="green" value={feedback.correctPosition} />
        <CounterBox color="yellow" value={feedback.correctLetterWrongPosition} />
        <CounterBox color="red" value={feedback.incorrect} />
      </div>
    </div>
  )
}
