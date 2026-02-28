type Props = {
    letter: string
    onKeyPress: (letter: string) => void
}

export function KeyboardLetter({ letter, onKeyPress }: Props) {
    const handleClick = () => {
        onKeyPress(letter);
    };

    const isSpecialKey = letter === "enter" || letter === "backspace";
    const baseClass = "bg-gradient-to-b from-gray-100 to-gray-200 rounded-md font-bold text-gray-800 flex items-center justify-center cursor-pointer shadow-sm hover:shadow-md active:translate-y-0.5 active:shadow-sm transition-all duration-75 border border-gray-300 text-xs sm:text-sm uppercase select-none";

    const sizeClass = isSpecialKey
        ? "w-[54px] h-[36px] sm:w-[66px] sm:h-[44px]"
        : "w-[36px] h-[36px] sm:w-[44px] sm:h-[44px] aspect-square";

    return (
        <button
            onClick={handleClick}
            className={`${sizeClass} ${baseClass}`}
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
