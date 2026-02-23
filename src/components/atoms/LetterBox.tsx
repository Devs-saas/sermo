type Props = {
  letter: string
}

export function LetterBox({ letter }: Props) {
  return (
    <div className="w-12 h-12 border flex text-[#222222] items-center justify-center font-bold text-lg bg-gray-300">
      {letter}
    </div>
  )
}
