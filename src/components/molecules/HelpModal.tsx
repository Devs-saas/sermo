import { Modal, type ModalProps } from "../atoms/Modal"
import { LetterBox } from "../atoms/LetterBox";
import { CounterBox } from "../atoms/CounterBox";

type HelpModalProps = {
  onClose: () => void;
};

export function HelpModal(props: HelpModalProps) {
  const { onClose } = props;

  const title = "Como Jogar?"
  const children = (
    <div className="text-left text-[var(--brand-cream)] max-w-[60ch] mx-auto space-y-4 sm:space-y-5">
      <p>
        Todo dia tem uma nova palavra secreta esperando por você.
        Seu desafio é descobrir qual é ela em até <strong>8 tentativas</strong>.
      </p>

      <div className="space-y-2">
        <p>A cada chute, você recebe uma dica dizendo:</p>

        <ul className="space-y-1">
          <li className="pl-3 sm:pl-4 font-semibold text-[var(--brand-green)]">
            Quantas letras estão no lugar certo
          </li>
          <li className="pl-3 sm:pl-4 font-semibold text-[var(--brand-yellow)]">
            Quantas fazem parte da palavra, mas estão na posição errada
          </li>
          <li className="pl-3 sm:pl-4 font-semibold text-[var(--brand-red)]">
            Quantas não aparecem na palavra
          </li>
        </ul>

        <div className="flex flex-wrap justify-center">
          <CounterBox color="green" value={0} />
          <CounterBox color="yellow" value={0} />
          <CounterBox color="red" value={0} />
        </div>
      </div>

      <p>
        Use as informações com calma, ajuste seu próximo chute
        e vá eliminando possibilidades até chegar na palavra do dia.
      </p>

      <div className="space-y-2">
        <p>
          Para se organizar, você pode clicar nas letras e registrar suas ideias durante a partida.
        </p>

        <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center p-3 sm:p-4">
          <LetterBox letter="S" canChangeColor className="max-w-12 sm:max-w-14 md:max-w-20" />
          <LetterBox letter="E" canChangeColor className="max-w-12 sm:max-w-14 md:max-w-20" />
          <LetterBox letter="R" canChangeColor className="max-w-12 sm:max-w-14 md:max-w-20" />
          <LetterBox letter="M" canChangeColor className="max-w-12 sm:max-w-14 md:max-w-20" />
          <LetterBox letter="O" canChangeColor className="max-w-12 sm:max-w-14 md:max-w-20" />
        </div>
      </div>

      <div className="space-y-1">
        <p>Os acentos são preenchidos automaticamente.</p>
        <p>As palavras podem ter letras repetidas.</p>
      </div>
    </div>
  )


  const modalProps = {
    attrs: {
      title,
      children
    },
    onClose
  } as ModalProps

  return (
    <Modal {...modalProps} />
  )
}