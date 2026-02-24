type Props = {
  letter: string
  active?: boolean
}

export function LetterBox({ letter, active }: Props) {
  return (
    <div
      className={`
        aspect-square md:w-12 border flex text-[#222222] items-center justify-center font-bold text-lg bg-gray-300
        ${active ? "border-black" : "border-gray-300"}
      `}
    >
      {letter}
    </div>
  )
}
