import { forwardRef, useEffect, useImperativeHandle, useState } from "react"
import { LetterBox } from "../atoms/LetterBox"

type Props = {
  wordLength: number
  onSubmit: (word: string) => void
  ref: React.ForwardedRef<{ pressKey: (key: string) => void }>
}

export type WordInputHandle = {
  handleKey: (key: string) => void
}

export const WordInput = forwardRef<WordInputHandle, Props>(
({ wordLength, onSubmit }, ref) => {
  const [currentWord, setCurrentWord] = useState<string>("")
  const [cursor, setCursor] = useState(0)

  function focusAt(position: number) {
    setCursor(position)
  }

  function handleKey(key: string) {
    key = key.toLowerCase()
    // Enter envia
    if (key === "enter") {
      if (currentWord.length === wordLength) {
        onSubmit(currentWord)
        setCurrentWord("")
        setCursor(0)
      }
      return
    }

    // Backspace apaga
    if (key === "backspace") {
      setCurrentWord((prev) => prev.slice(0, -1))
      setCursor((c) => Math.max(0, c - 1))
      return
    }

    // Letras
    if (/^[a-z]$/.test(key)) {
      setCurrentWord((prev) => {
        if (prev.length >= wordLength) return prev
        return prev + key
      })
      setCursor((c) => Math.min(wordLength - 1, c + 1))
      return
    }

    if (key === "arrowleft") {
      setCursor((c) => Math.max(0, c - 1))
    }

    if (key === "arrowright") {
      setCursor((c) => Math.min(wordLength - 1, c + 1))
    }
  }

  useImperativeHandle(ref, () => ({
    handleKey
  }))
  
  function handleKeyDown(e: KeyboardEvent) {
    if(e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault()
    }
    handleKey(e.key)
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <div className="relative">
      <div className="flex gap-1 select-none">
        {Array.from({ length: wordLength }).map((_, i) => (
          <div key={i} onClick={() => focusAt(i)} className="flex flex-1">
            <LetterBox
              letter={currentWord[i] || ""}
              active={cursor === i}
            />
          </div>
        ))}
      </div>
    </div>
  )
})
