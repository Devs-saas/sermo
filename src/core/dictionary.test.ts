import { describe, it, expect, beforeEach } from "vitest"
import { Dictionary } from "./dictionary"

describe("Dictionary", () => {
  let dictionary: Dictionary

  beforeEach(() => {
    dictionary = new Dictionary()
  })

  describe("isValidGuess", () => {
    it("should return true for a valid guess", () => {
      expect(dictionary.isValidGuess("BANCO")).toBe(true)
    })

    it("should be case insensitive", () => {
      expect(dictionary.isValidGuess("banco")).toBe(true)
    })

    it("should return false for invalid guess", () => {
      expect(dictionary.isValidGuess("XXXXX")).toBe(false)
    })
  })

  describe("isPossibleAnswer", () => {
    it("should return true for a valid answer", () => {
      expect(dictionary.isPossibleAnswer("TERMO")).toBe(true)
    })

    it("should be case insensitive", () => {
      expect(dictionary.isPossibleAnswer("termo")).toBe(true)
    })

    it("should return false for word not in answers list", () => {
      expect(dictionary.isPossibleAnswer("REACT")).toBe(false)
    })

    it("should return true for a normalized word", () => {
      expect(dictionary.isPossibleAnswer("MUTUO")).toBe(true)
    })
  })

  describe("data integrity", () => {
    it("should not mix valid guesses with answers", () => {
      // REACT é guess válido mas não resposta possível
      expect(dictionary.isValidGuess("BOIEM")).toBe(true)
      expect(dictionary.isPossibleAnswer("BOIEM")).toBe(false)
    })
  })
})
