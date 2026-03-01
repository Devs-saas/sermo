import type { ColorState } from "../../core/types"
import { KeyboardLetter } from "../atoms/KeyboardLetter"

type Props = {
    letters: string[]
    onKeyPress: (letter: string) => void
    keyColors?: Record<string, ColorState>
}

export function KeyboardRow({ letters, onKeyPress, keyColors }: Props) {
    return (
        <div className="flex w-full justify-center gap-1 sm:gap-1.5 md:gap-2 px-1">
            {letters.map((letter) => (
                <KeyboardLetter key={letter} letter={letter} onKeyPress={onKeyPress} colorState={keyColors?.[letter]} />
            ))}
        </div>
    )
}
