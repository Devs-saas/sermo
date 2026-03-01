import { useState } from "react"

type toggleSwitchProps = {
  initialState?: boolean;
  onCheckedChange: (v: boolean) => void;
}

export function ToggleSwitch({ initialState = false, onCheckedChange }: toggleSwitchProps) {
  const [checked, setChecked] = useState(initialState)

  return (
    <label className="inline-flex w-fit items-center cursor-pointer">
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        checked={checked}
        onChange={(e) => {
          setChecked(e.target.checked)
          onCheckedChange(e.target.checked)
        }}
      />
      <div 
        className="relative w-16 h-8 bg-[var(--brand-red)] rounded-full
          peer-focus:outline-none peer-checked:bg-[var(--brand-green)]
          after:content-[''] after:absolute after:top-[2px] after:left-[2px]
          after:h-7 after:w-7 after:rounded-full after:bg-white after:transition-transform
          peer-checked:after:translate-x-8"
        />
      <span className="select-none ms-3 text-ms uppercase font-medium text-heading text-[var(--brand-cream)]">Ver solução</span>
    </label>
  )
}