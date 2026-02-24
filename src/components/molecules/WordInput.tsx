import { useEffect, useState } from "react"
import { LetterBox } from "../atoms/LetterBox"

type Props = {
  wordLength: number
  onSubmit: (word: string) => void
  disabled?: boolean
}

export function WordInput({ wordLength, onSubmit, disabled }: Props) {
  const [currentWord, setCurrentWord] = useState("")

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (disabled) return

      const key = e.key.toLowerCase()

      // Enter envia
      if (key === "enter") {
        if (currentWord.length === wordLength) {
          onSubmit(currentWord)
          setCurrentWord("")
        }
        return
      }

      // Backspace apaga
      if (key === "backspace") {
        setCurrentWord((prev) => prev.slice(0, -1))
        return
      }

      // Letras
      if (/^[a-z]$/.test(key)) {
        setCurrentWord((prev) => {
          if (prev.length >= wordLength) return prev
          return prev + key
        })
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentWord, wordLength, onSubmit, disabled])

  return (
    <div className="flex gap-1">
      {Array.from({ length: wordLength }).map((_, i) => (
        <LetterBox
            key={i}
            letter={currentWord[i] ?? ""}
            active={i === currentWord.length}
        />
      ))}
    </div>
  )
}
