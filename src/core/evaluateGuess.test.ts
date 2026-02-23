import { describe, it, expect } from "vitest"
import { evaluateGuess } from "./evaluateGuess"

describe("evaluateGuess", () => {
  it("should return all correct when words are equal", () => {
    const result = evaluateGuess("BANCO", "BANCO")

    expect(result).toEqual({
      correctPosition: 5,
      correctLetterWrongPosition: 0,
      incorrect: 0,
    })
  })

  it("should return all incorrect when no letters match", () => {
    const result = evaluateGuess("BANCO", "XXXXX")

    expect(result).toEqual({
      correctPosition: 0,
      correctLetterWrongPosition: 0,
      incorrect: 5,
    })
  })

  it("should handle guess with multiple results correctly", () => {
    const result = evaluateGuess("BANCO", "NACHO")

    expect(result).toEqual({
      correctPosition: 2,
      correctLetterWrongPosition: 2,
      incorrect: 1,
    })
  })

  it("should handle repeated letters correctly", () => {
    const result = evaluateGuess("BALAO", "AAAAA")

    expect(result.correctPosition + result.correctLetterWrongPosition).toBeLessThanOrEqual(3)
  })
})
