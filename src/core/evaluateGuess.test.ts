import { describe, it, expect } from "vitest"
import { evaluateGuess, evaluateGuessPositions } from "./evaluateGuess"

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

describe("evaluateGuessPositions", () => {

  it("deve lançar erro se os tamanhos forem diferentes", () => {
    expect(() =>
      evaluateGuessPositions("ABC", "ABCD")
    ).toThrow()
  })

  it("deve marcar todas como right quando guess = secret", () => {
    const result = evaluateGuessPositions("APPLE", "APPLE")

    expect(result.positions).toEqual([
      "right",
      "right",
      "right",
      "right",
      "right",
    ])
  })

  it("deve marcar todas como wrong quando nenhuma letra existe", () => {
    const result = evaluateGuessPositions("APPLE", "ZZZZZ")

    expect(result.positions).toEqual([
      "wrong",
      "wrong",
      "wrong",
      "wrong",
      "wrong",
    ])
  })

  it("deve marcar letras corretas fora de posição como wrong-placed", () => {
    const result = evaluateGuessPositions("APPLE", "PAPEL")

    expect(result.positions).toEqual([
      "wrong-placed", // P
      "wrong-placed", // A
      "right",        // P
      "wrong-placed", // E
      "wrong-placed", // L
    ])
  })

  it("não deve contar letras repetidas além da quantidade no secret", () => {
    const result = evaluateGuessPositions("APPLE", "PPPPP")

    expect(result.positions).toEqual([
      "wrong",
      "right",
      "right",
      "wrong",
      "wrong",
    ])
  })
})