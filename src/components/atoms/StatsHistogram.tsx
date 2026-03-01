import clsx from "clsx";

type StatsHistogramProps = {
  label?: string
  max?: number
  value?: number
};

export function StatsHistogram({label = "", max = 0, value = 0}: StatsHistogramProps) {
  const barLength = value > 0 ? `${Math.round(((value / max) * 100))}%` : "fit-content";
  const barColor  = value > 0 ? "bg-[var(--brand-green)]" : 'bg-[var(--brand-dark)]'
  const textColor = value > 0 ? "text-black": "text-(--brand-cream)"

  return (
    <div className="flex text-[clamp(0.95rem,5vw,1.3rem)]">
      <p className="mr-2 w-[2ch]">{label}</p>
      <div className={
        clsx(
          `${barColor} ${textColor} px-3 text-[clamp(0.95rem,5vw,1.3rem)] rounded-lg text-end`
        )}
        style={{
          width: barLength,
        }}
      >
        {value}
      </div>
    </div>
  )
}