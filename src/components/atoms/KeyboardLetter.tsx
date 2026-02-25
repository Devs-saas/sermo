type Props = {
    letter: string
}

export function KeyboardLetter({ letter }: Props) {
   const handleClick = () => {
       console.log(`Letter pressed: ${letter}`);
   };

   const isSpecialKey = letter === "enter" || letter === "backspace";
   const baseClass = "bg-gradient-to-b from-gray-100 to-gray-200 rounded-md font-semibold text-gray-800 flex items-center justify-center cursor-pointer shadow-md hover:shadow-lg hover:-translate-y-1 active:translate-y-1 active:shadow-sm transition-all duration-75 border border-gray-300 text-sm";
   const sizeClass = letter === "enter" ? "w-16 h-12" : "w-12 h-12";
   const paddingClass = isSpecialKey ? "ml-5" : "";

   return (
    <button
        onClick={handleClick}
        className={`${sizeClass} ${baseClass} ${paddingClass}`}
    >
        {letter === "backspace" ? "←" : letter}
    </button>
   )
}
