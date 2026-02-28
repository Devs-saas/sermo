import { useRef, useState, useEffect, forwardRef, useImperativeHandle } from "react"
import { LetterBox } from "../atoms/LetterBox"

export type WordInputHandle = {
  pressKey: (key: string) => void
}

type Props = {
  wordLength: number
  onSubmit: (word: string) => void
}

export const WordInput = forwardRef<WordInputHandle, Props>(function WordInput({ wordLength, onSubmit }: Props, ref: React.ForwardedRef<WordInputHandle>) {
  const [letters, setLetters] = useState<string[]>(
    Array(wordLength).fill("")
  )
  const [cursor, setCursor] = useState(0)
  const [rawValue, setRawValue] = useState("")

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useImperativeHandle(ref, () => ({
    pressKey(key: string) {
      const upper = key.toUpperCase()
      if (upper === "ENTER") {
        if (letters.every((l) => l !== "")) {
          onSubmit(letters.join(""))
          setLetters(Array(wordLength).fill(""))
          setRawValue("")
          setCursor(0)
        }
      } else if (upper === "BACKSPACE") {
        setLetters((prev) => {
          const copy = [...prev]
          if (copy[cursor] !== "") {
            copy[cursor] = ""
            setCursor((c) => Math.max(0, c - 1))
          } else if (cursor > 0) {
            copy[cursor - 1] = ""
            setCursor(cursor - 1)
          }
          return copy
        })
        setRawValue((r) => r.slice(0, -1))
      } else if (/^[A-Z]$/.test(upper)) {
        setLetters((prev) => {
          const copy = [...prev]
          copy[cursor] = upper
          return copy
        })
        if (cursor < wordLength - 1) setCursor((c) => c + 1)
        setRawValue((r) => r + upper)
      }
    },
  }))

  function focusAt(position: number) {
    setCursor(position)
    inputRef.current?.focus()
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value
      .toUpperCase()
      .replace(/[^A-Z]/g, "")

    const diff = newValue.length - rawValue.length
    setRawValue(newValue)

    // INSERÇÃO
    if (diff > 0) {
      const lastChar = newValue[newValue.length - 1]

      setLetters((prev) => {
        const copy = [...prev]
        copy[cursor] = lastChar
        return copy
      })

      if (cursor < wordLength - 1) {
        setCursor((c) => c + 1)
      }
    }

    // DELEÇÃO
    if (diff < 0) {
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
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      if (letters.every((l) => l !== "")) {
        onSubmit(letters.join(""))
        setLetters(Array(wordLength).fill(""))
        setCursor(0)
        setRawValue("")
      }
    }

    if (e.key === "ArrowLeft") {
      e.preventDefault()
      setCursor((c) => Math.max(0, c - 1))
    }

    if (e.key === "ArrowRight") {
      e.preventDefault()
      setCursor((c) => Math.min(wordLength - 1, c + 1))
    }
  }

  return (
    <div className="relative">
      <input
        ref={inputRef}
        value={rawValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="absolute opacity-0"
        inputMode="text"
        autoCapitalize="characters"
        autoCorrect="off"
        autoFocus
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
})
