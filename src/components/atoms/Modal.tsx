import { useEffect, useRef, useState, type ReactNode } from "react";
import clsx from "clsx";

export type ModalProps = {
  attrs?: {
    title?: string;
    children?: ReactNode;
    buttonText?: string;
  }
  styling?: {
    modalWindow?: string,
    closeButton?: string
  }
  onClose: () => void;
};

export function Modal(props: ModalProps) {

  const { attrs, styling, onClose } = props;
  const [isClosing, setIsClosing] = useState(false);

  const modalDivRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.body.style.overflow = "hidden";
    modalDivRef.current?.focus();
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleClosingWithKeyboard = (e : React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape" && !isClosing) {
      handleClose();
    }
  }

  const handleClose = () => {
    setIsClosing(true);
  };

  const handleAnimationEnd = () => {
    if (isClosing) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      tabIndex={-1}
      onKeyDown={handleClosingWithKeyboard}
      ref={modalDivRef}
    >
      <div 
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
        onClick={handleClose}
      />


      <div
        className={clsx(
          `relative bg-zinc-800 rounded-2xl shadow-2xl text-center
            w-[min(86vw,42rem)] 
            max-h-[85vh] overflow-auto
            p-4 sm:p-6 md:p-8
            modal-anim ${isClosing ? "modal-anim-leave" : "modal-anim-enter"}`,
          styling?.modalWindow ?? " "
        )}
        onAnimationEnd={handleAnimationEnd}
      >
        <h2 className="mb-6 text-3xl font-bold text-[var(--brand-green)]">
          {attrs?.title}
        </h2>
        <div 
          className="flex flex-1 justify-center text-sm/relaxed text-[clamp(0.95rem,1.5vw,1.1rem)]"
        >
          {attrs?.children}
        </div>
        <button
          onClick={handleClose}
          className={clsx(
            "mt-6 px-5 py-2 rounded-lg font-semibold cursor-pointer text-white",
            "bg-blue-600 hover:bg-blue-700 transition",
            "text-[clamp(0.95rem,1.4vw,1.05rem)]",
            styling?.closeButton ?? " "
          )}
        >
          {attrs?.buttonText ?? "Fechar"}
        </button>
      </div>
    </div>
  );
}
