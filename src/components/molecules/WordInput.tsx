import { useRef, useState } from "react"
import { LetterBox } from "../atoms/LetterBox"

type Props = {
  wordLength: number
  onSubmit: (word: string) => void
}

export function WordInput({ wordLength, onSubmit }: Props) {
  const [value, setValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
      .toUpperCase()
      .replace(/[^A-Z]/g, "") // só letras
      .slice(0, wordLength)

    setValue(val)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && value.length === wordLength) {
      onSubmit(value)
      setValue("")
    }
  }

  function focusInput() {
    inputRef.current?.focus()
  }

  return (
    <div
      onClick={focusInput}
      className="flex gap-1 cursor-text relative"
    >
      {/* INPUT INVISÍVEL */}
      <input
        ref={inputRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="absolute opacity-0 pointer-events-none"
        autoFocus
      />

      {/* CAIXAS VISUAIS */}
      {Array.from({ length: wordLength }).map((_, i) => (
        <LetterBox
          key={i}
          letter={value[i] ?? ""}
        />
      ))}
    </div>
  )
}
