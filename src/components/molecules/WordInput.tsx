import { useRef, useState, useEffect } from "react"
import { LetterBox } from "../atoms/LetterBox"

type Props = {
  wordLength: number
  onSubmit: (word: string) => void
}

export function WordInput({ wordLength, onSubmit }: Props) {
  const [letters, setLetters] = useState<string[]>(
    Array(wordLength).fill("")
  )
  const [cursor, setCursor] = useState(0)

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  function focusAt(position: number) {
    setCursor(position)
    inputRef.current?.focus()
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const key = e.key

    // ENTER
    if (key === "Enter") {
      if (letters.every((l) => l !== "")) {
        onSubmit(letters.join(""))
        setLetters(Array(wordLength).fill(""))
        setCursor(0)
      }
      return
    }

    // SETA ESQUERDA
    if (key === "ArrowLeft") {
      e.preventDefault()
      setCursor((c) => Math.max(0, c - 1))
      return
    }

    // SETA DIREITA
    if (key === "ArrowRight") {
      e.preventDefault()
      setCursor((c) => Math.min(wordLength - 1, c + 1))
      return
    }

    // BACKSPACE
    if (key === "Backspace") {
      e.preventDefault()

      setLetters((prev) => {
        const copy = [...prev]

        let newCursor = cursor

        if (copy[cursor] !== "") {
          copy[cursor] = ""
          newCursor = Math.max(0, cursor - 1)
        } else if (cursor > 0) {
          copy[cursor - 1] = ""
          newCursor = cursor - 1
        }

        setCursor(newCursor)
        return copy
      })

      return
    }


    // LETRA
    if (/^[a-zA-Z]$/.test(key)) {
      e.preventDefault()

      const upper = key.toUpperCase()

      setLetters((prev) => {
        const copy = [...prev]
        copy[cursor] = upper
        return copy
      })

      if (cursor < wordLength - 1) {
        setCursor((c) => c + 1)
      }

      return
    }
  }

  return (
    <div className="relative">
      {/* input invisível só para abrir teclado mobile */}
      <input
        ref={inputRef}
        className="absolute opacity-0"
        onKeyDown={handleKeyDown}
        inputMode="text"
        autoCapitalize="characters"
        autoCorrect="off"
      />

      <div className="flex gap-1">
        {letters.map((letter, i) => (
          <div key={i} onClick={() => focusAt(i)} className="flex flex-1">
            <LetterBox
              letter={letter}
              active={cursor === i}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
