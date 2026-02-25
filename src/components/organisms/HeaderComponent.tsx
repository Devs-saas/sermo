import { useState } from "react";
import { HelpModal } from "../molecules/HelpModal";

export function HeaderComponent() {
  const [helpModalOpen, setHelpModalOpen] = useState(false);

  return (
    <>
    <header className="sticky top-0 z-50 backdrop-blur w-full pb-5 flex flex-row px-10 items-center">
      <nav className="mx-auto flex w-fit h-16 items-center px-4 sm:px-6">
        <a href="#" className="inline-flex items-center gap-2">
          <img src="svgs/logo-simple.svg" alt="Sermo logo" className='h-10'/>
          <span className="text-4xl tracking-[15%] text-[var(--brand-cream)]">SERMO</span>
        </a>
      </nav>

        <button 
          className="material-symbols-outlined text-2xl! aspect-square border-3 border-b-6 w-12 rounded-lg
            text-[var(--brand-green)] hover:bg-white/5 cursor-pointer ease-in"
          onClick={() => setHelpModalOpen(true)}
        >
        book_ribbon
        </button>

    </header>
    {
      helpModalOpen && <HelpModal onClose={() => setHelpModalOpen(false)} />
    }
    </>
  )
}