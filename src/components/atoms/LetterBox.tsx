type Props = {
  letter: string
  maxSize: number
}

export function LetterBox({ letter, maxSize }: Props) {
  return (
    <div className={`aspect-square w-[${maxSize}%] md:w-12 border flex text-[#222222] items-center justify-center font-bold text-lg bg-gray-300`}>
      {letter}
    </div>
  )
}
