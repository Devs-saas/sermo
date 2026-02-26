import { useState } from "react";
import { HelpModal } from "../molecules/HelpModal";
import { IconButton } from "../atoms/IconButton";

export function HeaderComponent() {
  const [helpModalOpen, setHelpModalOpen] = useState(false);

  return (
    <>
    <header className="sticky top-0 z-50 w-full backdrop-blur pb-5 px-4 sm:px-10">
      <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center">
        {/* left corner icons */}
        <div className="justify-self-start flex items-center gap-2">
        </div>

        {/* centered nav */}
        <nav className="justify-self-center">
          <a href="#" className="inline-flex items-center gap-2">
            <img src="svgs/logo-simple.svg" alt="Sermo logo" className="h-10" />
            <span className="text-4xl tracking-[0.15em] text-[var(--brand-cream)]">SERMO</span>
          </a>
        </nav>

        {/* right corner icons */}
        <div className="justify-self-end flex items-center gap-2">
          <IconButton
            iconName="book_ribbon"
            onClick={() => setHelpModalOpen(true)}
            style="text-[var(--brand-green)]"
          />
        </div>
      </div>
    </header>
    {
      helpModalOpen && <HelpModal onClose={() => setHelpModalOpen(false)} />
    }
    </>
  )
}