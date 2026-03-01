import { useState } from "react";
import { Modal, type ModalProps } from "../atoms/Modal";
import { StatsHistogram } from "../atoms/StatsHistogram";
import { usePlayerStatistics } from "../../hooks/usePlayerStatistics";
import { FaWhatsapp, FaLinkedin, FaRegCopy  } from "react-icons/fa"
import type { PlayerStatistics } from "../../core/types";

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

  const [shareStatus, setShareStatus] = useState<'idle'|'copied'|'error'>('idle');

  const formatShareText = (stats: PlayerStatistics) => {
    const {
      nGamesPlayed,
      nGamesWon,
      actualVictorySequence,
      bestVictorySequence
    } = stats

    const winRate =
      nGamesPlayed > 0
        ? Math.round((nGamesWon / nGamesPlayed) * 100)
        : 0

    const resultLine = isWinner
      ? `\u{1F7E2} Vitória em ${nAttempts}/8`
      : `\u{1F534} Não foi dessa vez`

    const origin = typeof window !== "undefined"
        ? window.location.origin
        : ""

return (
`\u{1F4CD} O SERMO de hoje ta feito!!!

${resultLine}

\u{1F4CA} ${winRate}% de vitórias
\u{1F525} Sequência atual: ${actualVictorySequence}
\u{1F3C6} Melhor sequência: ${bestVictorySequence}

Jogue também: ${origin}`
)
  }

  const shareWhatsApp = () => {
    try {
      const text = formatShareText(playerStats)
      const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`
      window.location.href = url
    } catch (e) {
      setShareStatus("error")
    }
  }

  const shareLinkedIn = async () => {
    try {
      const text = formatShareText(playerStats)
      const origin = window.location.origin

      if (navigator.share) {
        await navigator.share({
          text,
          url: origin,
        })
      } else {
        await navigator.clipboard.writeText(text)
        window.open("https://www.linkedin.com/feed/?shareActive=true", "_blank")
      }
    } catch {
      setShareStatus("error")
    }
  }
  
  const copyToClipboard = async () => {
    try {
      const text = formatShareText(playerStats)
      await navigator.clipboard.writeText(text)
      setShareStatus("copied")
    } catch (error) {
      setShareStatus("error")
    }
  }

  const children = (
    <div className="w-full text-zinc-300">
      <div>
      {isWinner ? (
        <>
          <p>
            Parabéns, você acertou a palavra!
            <br />
            Com {nAttempts} tentativa{nAttempts === 1 ? "" : "s"}.
          </p>
        </>
      ) : (
        <>
          <p>
            A palavra era:
          </p>
          <p className="text-2xl text-white font-bold mt-2 tracking-widest">
            {answer}
          </p>
        </>
      )}
      </div>

      <div>
        <h2 className="my-2 text-(--brand-green) text-3xl font-bold">
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
                key={index}
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
      
      <div className="flex flex-col items-center mt-4">
        <div className="flex gap-2">
          <button
            onClick={shareWhatsApp}
            className="flex items-center lg:flex-auto gap-2 px-4 py-2 bg-[#25D366] text-white rounded-md font-semibold shadow-sm hover:brightness-95 transition"
          >
            <FaWhatsapp size={32} />
          </button>

          <button
            onClick={shareLinkedIn}
            className="flex items-center lg:flex-auto gap-2 px-4 py-2 bg-[#0A66C2] text-white rounded-md font-semibold shadow-sm hover:brightness-95 transition"
          >
            <FaLinkedin size={32} />
          </button>

          <button
            onClick={copyToClipboard}
            className="flex items-center lg:flex-auto gap-2 px-4 py-2 bg-(--brand-cream) text-(--brand-dark) rounded-md font-semibold shadow-sm hover:brightness-95 transition"
          >
            <FaRegCopy size={32} />
          </button>
        </div>

        {shareStatus === 'copied' && (
          <p className="text-sm text-(--brand-green) mt-2">Copiado para a área de transferência!</p>
        )}

        {shareStatus === 'error' && (
          <p className="text-sm text-(--brand-red) mt-2">Não foi possível compartilhar.</p>
        )}
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