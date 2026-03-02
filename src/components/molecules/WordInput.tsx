import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react"
import { LetterBox } from "../atoms/LetterBox"

type Props = {
  wordLength: number
  onSubmit: (word: string) => void
  error: string | null
  ref: React.ForwardedRef<{ pressKey: (key: string) => void }>
}

export type WordInputHandle = {
  handleKey: (key: string) => void
}

export const WordInput = forwardRef<WordInputHandle, Props>(
({ wordLength, onSubmit, error }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentWord, setCurrentWord] = useState<string[]>(
    Array(wordLength).fill("")
  )

  const [invalid, setInvalid] = useState(false)

  useEffect(() => {
    if (error) {
      setInvalid(true)
      setTimeout(() => setInvalid(false), 600)
    }
  }, [error])

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

      containerRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center"
      })
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
    <div className="relative" ref={containerRef}>
      <div className="flex gap-1 select-none">
        {Array.from({ length: wordLength }).map((_, i) => (
          <div
            style={
              invalid
                ? { animationDelay: `${i * 60}ms` }
                : undefined
            }
            className={`
              flex flex-1 gap-1 select-none
              transition-all duration-200
              ${invalid ? "animate-shake" : ""}
            `}
            key={i} onClick={() => focusAt(i)}>
            <LetterBox
              letter={currentWord[i]}
              active={cursor === i}
              invalid={invalid}
            />
          </div>
        ))}
      </div>
    </div>
  )
})
