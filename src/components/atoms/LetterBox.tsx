type Props = {
  letter: string
  active?: boolean
}

export function LetterBox({ letter, active }: Props) {
  return (
    <div
      className={`
        aspect-square flex-1 border flex text-[#222222] items-center justify-center font-bold text-2xl bg-gray-300
        uppercase ${active ? "border-black" : "border-gray-300"}
      `}
    >
      {letter}
    </div>
  )
}