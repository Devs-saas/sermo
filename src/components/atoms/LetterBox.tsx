import { useState } from "react"
import clsx from "clsx"

type Props = {
  letter: string
  active?: boolean
  className?: string
  canChangeColor?: boolean
}

export function LetterBox({ letter, active, className, canChangeColor = false}: Props) {
  const colorStates = [
    "bg-[var(--brand-cream)]",
    "bg-[var(--brand-selected-green)]",
    "bg-[var(--brand-selected-yellow)]",
    "bg-[var(--brand-selected-red)]"
  ];

  const [colorState, setColorState] = useState(0);

  const handleColorState = () => {
    if (!canChangeColor) return;

    const maxColorState = colorStates.length;

    setColorState((colorState + 1) % maxColorState);
  }

  return (
    <div
      className={clsx(
        `
        aspect-square flex-1 border-4 flex text-[#222222] items-center justify-center font-bold text-2xl ${colorStates[colorState]}
        uppercase ${active ? "border-black" : "border-[var(--brand-cream)]"} select-none
      `, className
      )}
      onClick={handleColorState}
    >
      {letter}
    </div>
  )
}