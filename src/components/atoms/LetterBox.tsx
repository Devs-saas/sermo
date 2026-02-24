type Props = {
  letter: string
<<<<<<< Updated upstream
  maxSize: number
}

export function LetterBox({ letter, maxSize }: Props) {
  return (
    <div className={`aspect-square w-[${maxSize}%] md:w-12 border flex text-[#222222] items-center justify-center font-bold text-lg bg-gray-300`}>
=======
  active?: boolean
}

export function LetterBox({ letter, active }: Props) {
  return (
    <div
      className={`
        w-12 h-12 border flex items-center text-[#222222] justify-center text-xl font-bold uppercase bg-gray-300
        ${active ? "border-black" : "border-gray-300"}
      `}
    >
>>>>>>> Stashed changes
      {letter}
    </div>
  )
}
