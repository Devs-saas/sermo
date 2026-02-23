import { GuessRow } from "../molecules/GuessRow"
import type { GuessResult } from "../../core/types"

type Props = {
  guesses: GuessResult[]
}

export function GameBoard({ guesses }: Props) {
  return (
    <div className="flex flex-col mx-auto max-w-md gap-2">
      {guesses.map((g, i) => (
        <GuessRow key={i} guess={g} />
      ))}
    </div>
  )
}
