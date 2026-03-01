import { useState } from "react"
import clsx from "clsx"
import type { ColorState } from "../../core/types"
import { colorStates } from "../../core/consts"

type Props = {
  letter: string
  active?: boolean
  className?: string
  initialState?: ColorState
  canChangeColor?: boolean
  updateKeyboardColors?: (key: string, color: ColorState) => void
}

export function LetterBox({ letter, active, className, updateKeyboardColors, initialState = "neutral", canChangeColor = false}: Props) {
  const [colorState, setColorState] = useState<ColorState>(initialState);
  const colorStateOrder: ColorState[] = ["neutral", "right", "wrong-placed", "wrong"];

  const handleColorState = () => {
    if (!canChangeColor) return;
    const currentIndex = colorStateOrder.indexOf(colorState);
    const nextIndex = (currentIndex + 1) % colorStateOrder.length;

    setColorState(colorStateOrder[nextIndex]);
    updateKeyboardColors?.(letter, colorStateOrder[nextIndex]);
  }

  return (
    <div
      className={clsx(
        `
        aspect-square flex-1 flex text-[#222222] items-center justify-center font-bold text-2xl ${colorStates[colorState]}
        uppercase ${active ? "border-black border-4" : ""} select-none
      `, className
      )}
      onClick={handleColorState}
    >
      {letter}
    </div>
  )
}