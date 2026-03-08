import guesses from "../data/guesses.json"
import answers from "../data/secrets.json"
import translator from "../data/acentos_fixed.json"

function normalizeWord(word: string): string {
  return word
    .normalize("NFD") // separa letra + acento
    .replace(/[\u0300-\u036f]/g, "") // remove os acentos
    .toUpperCase(); // já deixa maiúsculo
}

export class Dictionary {
  // chutes validos
  private validGuesses: Set<string>
  // palavras que ser selecionadas como respostas
  private answers: Set<string>
  private translator: Map<string, string>

  constructor() {
    // nao sei como ta a base ent deixa tudo maiusculo pra evitar confusão
    this.translator = new Map<string, string>(
      Object.entries(translator as Record<string, string>)
    )
    this.validGuesses = new Set(guesses.map(w => normalizeWord(w)))
    this.answers = new Set(answers.map(w => normalizeWord(w)))
    this.answers.forEach(answer => this.validGuesses.add(answer)) // garante que todas as respostas são chutes válidos
  }

  isValidGuess(word: string): boolean {
    return this.validGuesses.has(word.toUpperCase())
  }

  isPossibleAnswer(word: string): boolean {
    return this.answers.has(word.toUpperCase())
  }

  getAnswersSet(): Set<string> {
    return this.answers
  }

  translate(word: string): string {
    const normalized = normalizeWord(word)
    return this.translator.get(normalized) || word
  }
}
