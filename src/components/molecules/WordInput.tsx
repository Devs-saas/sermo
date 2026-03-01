import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from "react"
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
  const [currentWord, setCurrentWord] = useState<string[]>(
    Array(wordLength).fill("")
  )

  const [cursor, setCursor] = useState(0)

  function focusAt(position: number) {
    setCursor(position)
  }

  const handleKey = useCallback((rawKey: string) => {
    const key = rawKey.toLowerCase()

    // ENTER
    if (key === "enter") {
      const word = currentWord.join("")
      if (!currentWord.includes("") && word.length === wordLength) {
        onSubmit(word)
        setCurrentWord(Array(wordLength).fill(""))
        setCursor(0)
      }
      return
    }

    // BACKSPACE
    if (key === "backspace") {
      setCurrentWord((prev) => {
        const next = [...prev]

        next[cursor] = ""

        return next
      })
      setCursor(Math.max(0, cursor - 1))
      return
    }

    // LETRAS
    if (/^[a-z]$/.test(key)) {
      setCurrentWord((prev) => {
        if (cursor >= wordLength) return prev

        const next = [...prev]
        next[cursor] = key

        return next
      })
      setCursor((c) => Math.min(wordLength - 1, c + 1))
      return
    }

    // SETAS
    if (key === "arrowleft") {
      setCursor((c) => Math.max(0, c - 1))
      return
    }

    if (key === "arrowright") {
      setCursor((c) => Math.min(wordLength - 1, c + 1))
      return
    }
  }, [cursor, currentWord, wordLength, onSubmit])


  useImperativeHandle(ref, () => ({
    handleKey
  }))
  
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if(e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault()
    }
    handleKey(e.key)
  }, [handleKey])

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  return (
    <div className="relative">
      <div className="flex gap-1 select-none">
        {Array.from({ length: wordLength }).map((_, i) => (
          <div key={i} onClick={() => focusAt(i)} className="flex flex-1">
            <LetterBox
              letter={currentWord[i]}
              active={cursor === i}
            />
          </div>
        ))}
      </div>
    </div>
  )
})
