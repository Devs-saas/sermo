import { Modal, type ModalProps } from "../atoms/Modal"
import { LetterBox } from "../atoms/LetterBox";

type HelpModalProps = {
  onClose: () => void;
};

export function HelpModal(props: HelpModalProps) {
  const { onClose } = props;

  const title = "Como Jogar?"
  const children = (
    <div className="text-left text-[var(--brand-cream)] text-lg md:text-2xl">
      <p>
        Todo dia tem uma nova palavra secreta esperando por você.
        Seu desafio é descobrir qual é ela em até <strong>8 tentativas</strong>.
      </p>

      <br />

      A cada chute, você recebe uma dica dizendo:
      <br/>
      <strong className="text-[var(--brand-green)]">Quantas letras estão no lugar certo</strong>,
      <br/>
      <strong className="text-[var(--brand-yellow)]">Quantas fazem parte da palavra, mas estão na posição errada</strong>,
      <br/>
      e <strong className="text-[var(--brand-red)]">Quantas não aparecem na palavra</strong>.

      <br />

      <p>
        Use as informações com calma, ajuste seu próximo chute
        e vá eliminando possibilidades até chegar na palavra do dia.
      </p>

      <br />

      <span>
        Para se organizar, você pode clicar nas letras e registrar suas ideias durante a partida.
          <span className="flex flex-row gap-1 justify-center p-4">
            <LetterBox letter={"S"} canChangeColor={true} className="md:max-w-20"/>
            <LetterBox letter={"E"} canChangeColor={true} className="md:max-w-20"/>
            <LetterBox letter={"R"} canChangeColor={true} className="md:max-w-20"/>
            <LetterBox letter={"M"} canChangeColor={true} className="md:max-w-20"/>
            <LetterBox letter={"O"} canChangeColor={true} className="md:max-w-20"/>
          </span>
      </span>

      <p>
        Os acentos são preenchidos automaticamente.
      </p>
      <br />
      As palavras podem ter letras repetidas.
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