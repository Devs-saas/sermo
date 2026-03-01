import clsx from "clsx"
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
        <div className={clsx(
            // mobile layout: fixed bottom full width
            "fixed bottom-0 right-0 left-0 lg:w-full flex flex-col items-center gap-1 lg:gap-1.5 lg:gap-2 py-4 bg-(--brand-dark)/90 backdrop-blur-lg z-10",
            // revert for lg+ screens
            "lg:w-auto lg:z-auto lg:mx-auto lg:max-w-lg"
        )}>
            <KeyboardRow letters={row1} onKeyPress={onKeyPress} />
            <KeyboardRow letters={row2} onKeyPress={onKeyPress} />
            <KeyboardRow letters={row3} onKeyPress={onKeyPress} />
        </div>
    )
}
