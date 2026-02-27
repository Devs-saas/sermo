import { Modal, type ModalProps } from "../atoms/Modal";
import { StatsHistogram } from "../atoms/StatsHistogram";

type ResultModalProps = {
  nAttempts: number
  isWinner: boolean
  answer: string
  onClose: () => void
};

export function ResultModal(props: ResultModalProps) {
  const {nAttempts, isWinner, answer, onClose} = props

  // const playerStatistics = usePlayerStatistics();

  const children = (
    <div className="w-full text-zinc-300">
      <div>
      {isWinner ? (
        <>
          <p className="mt-3 ">
            Parabéns, você acertou a palavra!
            <br />
            Com {nAttempts} tentativa{nAttempts === 1 ? "" : "s"}.
          </p>
        </>
      ) : (
        <>
          <p className="mt-3 ">
            A palavra era:
          </p>
          <p className="text-2xl text-white font-bold mt-2 tracking-widest">
            {answer}
          </p>
        </>
      )}
      </div>

      <div>
        <h2 className="my-2 text-[var(--brand-green)] text-3xl font-bold">
          Estatísticas
        </h2>
      </div>
      <div className="flex w-full flex-row justify-between gap-2 text-[clamp(0.95rem,7vw,3rem)]">
        <div className="flex flex-col w-[23%]">
          10
          <span className="text-[clamp(0.95rem,2vw,1.2rem)]">jogos</span>
        </div>
        <div className="flex flex-col w-[23%]">
          10%
          <span className="text-[clamp(0.95rem,2vw,1.2rem)]">de vitórias</span>
        </div>
        <div className="flex flex-col w-[23%]">
          10
          <span className="text-[clamp(0.95rem,2vw,1.2rem)]">sequência de vitórias</span>
        </div>
        <div className="flex flex-col w-[23%]">
          10
          <span className="text-[clamp(0.95rem,2vw,1.2rem)]">melhor sequência</span>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <StatsHistogram label="1"/>
        <StatsHistogram label="2"/>
        <StatsHistogram label="3"/>
        <StatsHistogram label="4"/>
        <StatsHistogram label="5"/>
        <StatsHistogram label="6"/>
        <StatsHistogram label="7"/>
        <StatsHistogram label="8"/>
        <StatsHistogram label="💀"/>
      </div>
    </div>
  );

  const modalProps: ModalProps = {
    attrs: {
      title: isWinner ? "🎉 Você venceu!" : "😢 Você perdeu!",
      children: children
    },
    onClose
  }

  return (
    <Modal {...modalProps}/>
  );
}