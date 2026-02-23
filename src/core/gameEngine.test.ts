import { describe, it, expect, beforeEach } from "vitest"
import { GameEngine } from "./gameEngine"
import { Dictionary } from "./dictionary"

describe("GameEngine", () => {
  let dictionary: Dictionary

  const validGuesses = ["BANCO", "TERMO", "REACT", "CABOS"]
  const answers = ["BANCO"]

  beforeEach(() => {
    dictionary = new Dictionary(validGuesses, answers)
  })

  it("should start with playing status", () => {
    const engine = new GameEngine("BANCO", dictionary)
    expect(engine.getStatus()).toBe("playing")
  })

  it("should accept a valid guess and store it", () => {
    const engine = new GameEngine("BANCO", dictionary)

    const result = engine.submitGuess("TERMO")

    expect(result.guess).toBe("TERMO")
    expect(engine.getGuesses().length).toBe(1)
  })

  it("should win when guessing correctly", () => {
    const engine = new GameEngine("BANCO", dictionary)

    engine.submitGuess("BANCO")

    expect(engine.getStatus()).toBe("won")
  })

  it("should lose after reaching max attempts", () => {
    const engine = new GameEngine("BANCO", dictionary, 2)

    engine.submitGuess("TERMO")
    engine.submitGuess("REACT")

    expect(engine.getStatus()).toBe("lost")
  })

  it("should not allow invalid words", () => {
    const engine = new GameEngine("BANCO", dictionary)

    expect(() => {
      engine.submitGuess("XXXXX")
    }).toThrow("Palavra inválida")
  })

  it("should not allow guesses after winning", () => {
    const engine = new GameEngine("BANCO", dictionary)

    engine.submitGuess("BANCO")

    expect(() => {
      engine.submitGuess("TERMO")
    }).toThrow("Game is already finished")
  })

  it("should not allow guesses after losing", () => {
    const engine = new GameEngine("BANCO", dictionary, 1)

    engine.submitGuess("TERMO")

    expect(() => {
      engine.submitGuess("BANCO")
    }).toThrow("Game is already finished")
  })

  it("should correctly calculate remaining attempts", () => {
    const engine = new GameEngine("BANCO", dictionary, 3)

    engine.submitGuess("TERMO")

    expect(engine.getRemainingAttempts()).toBe(2)
  })

  it("getGuesses should return a copy, not internal reference", () => {
    const engine = new GameEngine("BANCO", dictionary)

    engine.submitGuess("TERMO")

    const guesses = engine.getGuesses()
    guesses.push({
      guess: "FAKE",
      feedback: {
        correctPosition: 0,
        correctLetterWrongPosition: 0,
        incorrect: 5,
      },
    })

    expect(engine.getGuesses().length).toBe(1)
  })
})
