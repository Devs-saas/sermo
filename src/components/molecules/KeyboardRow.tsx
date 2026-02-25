import { KeyboardLetter } from "../atoms/KeyboardLetter"

type Props = {
    letters: string[]
    offset?: number
}

export function KeyboardRow({ letters, offset = 0 }: Props) {
    return (
        <div className="flex gap-1" style={{ paddingLeft: `${offset}px` }}>
            {letters.map((letter) => (
                <KeyboardLetter key={letter} letter={letter} />
            ))}
        </div>
    )
}
