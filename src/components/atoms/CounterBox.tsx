type Props = {
  color: string
  value: number
}

export function CounterBox({ color, value }: Props) {
  const colorMap: Record<string, string> = {
    green: "bg-[#17C3B2]",
    yellow: "bg-[#FFCB77]",
    gray: "bg-[#989399]",
    red: "bg-[#E85F5C]"
  }

  return (
    <div className={`w-[33.333%] lg:w-19 lg:h-12 text-xl py-1 border flex ${colorMap[color]} text-[#222222] items-center justify-center font-bold`}>
        {value}
    </div>
  )
}
