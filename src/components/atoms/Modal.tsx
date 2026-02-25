import { useEffect, useState, type ReactNode } from "react";

export type ModalProps = {
  attrs?: {
    title?: string;
    children?: ReactNode;
    buttonText?: string;
  }
  onClose: () => void;
};

export function Modal(props: ModalProps) {

  const { attrs, onClose } = props;
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
  };

  const handleAnimationEnd = () => {
    if (isClosing) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`} />

      <div
        className={`relative bg-zinc-800 p-8 rounded-2xl shadow-2xl max-w-lg lg:min-w-xl text-center modal-anim ${isClosing ? 'modal-anim-leave' : 'modal-anim-enter'}`}
        onAnimationEnd={handleAnimationEnd}
      >
        <h2 className="text-3xl font-bold text-[var(--brand-green)]">
          {attrs?.title}
        </h2>
        {attrs?.children}
        <button
          onClick={handleClose}
          className="mt-6 px-5 py-2 text-white bg-blue-600 hover:bg-blue-700 transition rounded-lg font-semibold cursor-pointer"
        >
          {attrs?.buttonText ?? "Fechar"}
        </button>
      </div>
    </div>
  );
}
