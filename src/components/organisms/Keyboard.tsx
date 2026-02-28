import { KeyboardRow } from "../molecules/KeyboardRow"

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
        <div className="w-full max-w-[500px] mx-auto flex flex-col items-center gap-1 sm:gap-1.5 md:gap-2 pb-4">
            <KeyboardRow letters={row1} onKeyPress={onKeyPress} />
            <KeyboardRow letters={row2} onKeyPress={onKeyPress} paddingLeft="5%" />
            <KeyboardRow letters={row3} onKeyPress={onKeyPress} paddingLeft="10%" />
        </div>
    )
}
