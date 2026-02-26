import { useEffect } from "react"

type Props = {
  isWinner: boolean
  answer: string
  n_attempts: number
  onClose: () => void
}

export function GameResult({ isWinner, answer, n_attempts, onClose }: Props) {
  
  // trava scroll do fundo
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

    // <label className="inline-flex w-fit items-center cursor-pointer">
    //   <input 
    //     type="checkbox" 
    //     value="" 
    //     className="sr-only peer"
    //     checked={seeSolution}
    //     onChange={e => setSeeSolution(e.target.checked)}
    //   />
    //   <div 
    //     className="relative w-16 h-8 bg-[var(--brand-red)] rounded-full
    //       peer-focus:outline-none peer-checked:bg-[var(--brand-green)]
    //       after:content-[''] after:absolute after:top-[2px] after:left-[2px]
    //       after:h-7 after:w-7 after:rounded-full after:bg-white after:transition-transform
    //       peer-checked:after:translate-x-8"
    //     />
    //   <span className="select-none ms-3 text-ms uppercase font-medium text-heading text-[var(--brand-cream)]">Ver solução</span>
    // </label>

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative bg-zinc-900 p-8 rounded-2xl shadow-2xl w-[90%] max-w-md text-center animate-scale-in">
        
        {isWinner ? (
          <>
            <h2 className="text-3xl font-bold text-[var(--brand-green)]">
              🎉 Você venceu!
            </h2>
            <p className="mt-3 text-zinc-300">
              Parabéns, você acertou a palavra!
              <br />
              Com {n_attempts} tentativa{n_attempts === 1 ? "" : "s"}.
            </p>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-[var(--brand-red)]">
              😢 Você perdeu!
            </h2>
            <p className="mt-3 text-zinc-300">
              A palavra era:
            </p>
            <p className="text-2xl text-white font-bold mt-2 tracking-widest">
              {answer}
            </p>
          </>
        )}

        <button
          onClick={onClose}
          className="mt-6 px-5 py-2 text-white bg-blue-600 hover:bg-blue-700 transition rounded-lg font-semibold"
        >
          Fechar
        </button>
      </div>
    </div>
  )
}
