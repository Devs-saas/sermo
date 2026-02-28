import { KeyboardRow } from "../molecules/KeyboardRow.tsx"

type Props = {
    onKeyPress: (letter: string) => void
}

export function Keyboard({ onKeyPress }: Props) {
    const row1 = "QWERTYUIOP".split("")
    const row2 = "ASDFGHJKL".split("")
    const row3 = "ZXCVBNM".split("")
    row2.push("backspace")
    row3.push("enter")
    return (
        <div className="flex flex-col items-center gap-2">
            <div className="inline-flex flex-col gap-1">
                <KeyboardRow letters={row1} offset={0} onKeyPress={onKeyPress} />
                <KeyboardRow letters={row2} offset={14} onKeyPress={onKeyPress} />
                <KeyboardRow letters={row3} offset={28} onKeyPress={onKeyPress} />
            </div>
        </div>
    )
}
