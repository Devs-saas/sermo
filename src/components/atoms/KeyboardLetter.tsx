import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import type { ColorState } from "../../core/types";

type Props = {
    letter: string
    onKeyPress: (letter: string) => void
    colorState?: ColorState
}

export function KeyboardLetter({ letter, onKeyPress, colorState }: Props) {
    const [isPressed, setIsPressed] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const pressedKey = event.key.toLowerCase();
            const letterLower = letter.toLowerCase();

            // Match regular letters or special keys
            if (
                (letterLower === pressedKey) ||
                (letterLower === "enter" && event.key === "Enter") ||
                (letterLower === "backspace" && event.key === "Backspace")
            ) {
                setIsPressed(true);
                onKeyPress(letter);

                // Reset animation after it completes
                setTimeout(() => setIsPressed(false), 100);
            }
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            const releasedKey = event.key.toLowerCase();
            const letterLower = letter.toLowerCase();

            if (
                (letterLower === releasedKey) ||
                (letterLower === "enter" && event.key === "Enter") ||
                (letterLower === "backspace" && event.key === "Backspace")
            ) {
                setIsPressed(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [letter, onKeyPress]);

    const handleClick = () => {
        onKeyPress(letter);
    };

    const isSpecialKey = letter === "enter" || letter === "backspace";

    // define a base height so that keys remain square when using aspect-square
    const heightClass = "h-[32px] sm:h-[44px]";

    /* mobile (<md) behaviour: rows fill width and keys grow equally
       desktop (md+) behaviour: revert to fixed sizes similar to original layout */
    const sizeClass = isSpecialKey
        ? letter === "backspace"
            ? `flex-none basis-[10%] ${heightClass} h-[40px] flex-shrink-0 md:w-[44px]`
            : `flex-none basis-[10%] ${heightClass} h-[40px] flex-shrink-0 md:w-[66px] md:h-[44px]`
        : `flex-none basis-[9%] ${heightClass} h-[40px] md:w-[44px] md:h-[44px]`;

    return (
        <button
            ref={buttonRef}
            onClick={handleClick}
                className={clsx(`
                ${colorState === "right"?"bg-(--brand-selected-green)":""}
                ${colorState === "wrong-placed"?"bg-(--brand-selected-yellow)":""}
                ${colorState === "wrong"?"bg-(--brand-selected-red)":""}
                bg-(--brand-dark)
                ${colorState === "right"?"text-(--brand-dark)":""}
                ${colorState === "wrong-placed"?"text-(--brand-dark)":""}
                ${colorState === "wrong"?"text-(--brand-dark)":""}
                text-(--brand-cream)
                rounded-lg
                font-extrabold
                flex items-center justify-center
                uppercase tracking-wide
                text-sm sm:text-sm
                select-none
                ring
                ring-(--brand-cream)/50

                shadow-[0_2px_4px_var(--brand-cream)]
                hover:shadow-[0_3px_8px_var(--brand-cream)]

                ${isPressed ? "translate-y-0.5 shadow-[0_1px_2px_var(--brand-cream)]" : "hover:-translate-y-0.5"}
                active:translate-y-0.5

                transition-all duration-150 ease-out

                focus:outline-none
                focus:ring-1
                focus:ring-(--brand-cream)
                `,
                sizeClass
            )}
        >
            {letter === "backspace" ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
                </svg>
            ) : (
                letter
            )}
        </button>
    )
}
