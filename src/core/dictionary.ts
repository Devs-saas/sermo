export class Dictionary {
  getAnswersSet(): Set<string> {
    throw new Error("Method not implemented.")
  }
  // chutes validos
  private validGuesses: Set<string>
  // palavras que ser selecionadas como respostas
  private answers: Set<string>

  constructor(validGuesses: string[], answers: string[]) {
    // nao sei como ta a base ent deixa tudo maiusculo pra evitar confusão
    this.validGuesses = new Set(validGuesses.map(w => w.toUpperCase()))
    this.answers = new Set(answers.map(w => w.toUpperCase()))
  }

  isValidGuess(word: string): boolean {
    return this.validGuesses.has(word.toUpperCase())
  }

  isPossibleAnswer(word: string): boolean {
    return this.answers.has(word.toUpperCase())
  }
}
