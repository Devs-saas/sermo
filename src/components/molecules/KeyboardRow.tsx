import { KeyboardLetter } from "../atoms/KeyboardLetter"

type Props = {
    letters: string[]
    paddingLeft?: string
    onKeyPress: (letter: string) => void
}

export function KeyboardRow({ letters, onKeyPress, paddingLeft = "0px" }: Props) {
    return (
        <div className="flex w-full justify-center gap-1 sm:gap-1.5 md:gap-2 px-1" style={{ paddingLeft }}>
            {letters.map((letter) => (
                <KeyboardLetter key={letter} letter={letter} onKeyPress={onKeyPress} />
            ))}
        </div>
    )
}
