import clsx from "clsx";

type IconButtonProps = {
  iconName: string;
  onClick: () => void;
  style?: string
}

export function IconButton(props: IconButtonProps) {
  const {iconName, onClick, style} = props;

  return (
    <button 
      className={clsx(
        "material-symbols-outlined text-2xl! aspect-square border-3 border-b-6 w-12 rounded-lg",
        "text-[var(--brand-cream)] hover:bg-white/5 cursor-pointer ease-in",
        style
      )}
      onClick={onClick}
    >
      {iconName}
    </button>
  )
}