import { Modal, type ModalProps } from "../atoms/Modal";
import { StatsHistogram } from "../atoms/StatsHistogram";
import { usePlayerStatistics } from "../../hooks/usePlayerStatistics";
import { saveGameStatistics } from "../../utils/storage";

type ResultModalProps = {
  maxAttempts: number,
  nAttempts: number
  isWinner: boolean
  answer: string
  onClose: () => void
};

export function ResultModal(props: ResultModalProps) {
  const {maxAttempts, nAttempts, isWinner, answer, onClose} = props

  const playerStats = usePlayerStatistics();
  const winRate = playerStats.nGamesPlayed > 0 ? playerStats.nGamesWon * 100 / playerStats.nGamesPlayed : 0;

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
          {playerStats.nGamesPlayed}
          <span className="text-[clamp(0.95rem,2vw,1.2rem)]">jogos</span>
        </div>
        <div className="flex flex-col w-[23%]">
          {Math.floor(winRate)}%
          <span className="text-[clamp(0.95rem,2vw,1.2rem)]">de vitórias</span>
        </div>
        <div className="flex flex-col w-[23%]">
          {playerStats.actualVictorySequence}
          <span className="text-[clamp(0.95rem,2vw,1.2rem)]">sequência de vitórias</span>
        </div>
        <div className="flex flex-col w-[23%]">
          {playerStats.bestVictorySequence}
          <span className="text-[clamp(0.95rem,2vw,1.2rem)]">melhor sequência</span>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        {
          Array.from({ length: maxAttempts }, (_, index) => {
            return (
              <StatsHistogram
                label={String(index+1)}
                max={playerStats.nGamesPlayed}
                value={playerStats.playedGameAttempts[index]}
              />
            );
          })
        }
        <StatsHistogram
          label="💀"
          max={playerStats.nGamesPlayed}
          value={playerStats.playedGameAttempts[8]}
        />
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