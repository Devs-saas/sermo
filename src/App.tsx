import { GameBoard } from "./components/organisms/GameBoard"
import { HeaderComponent } from "./components/organisms/HeaderComponent"

function App() {
  return (
    <div className="bg-[var(--brand-bg)] h-full font-['Inter',system-ui,sans-serif]">
      <HeaderComponent />
      <GameBoard guesses={[
        {
          guess: "CRANE",
          feedback: {
            correctPosition: 2,
            correctLetterWrongPosition: 1,
            incorrect: 2
          }
        },
        {
          guess: "CRANE",
          feedback: {
            correctPosition: 2,
            correctLetterWrongPosition: 1,
            incorrect: 2
          }
        },
        {
          guess: "CRANE",
          feedback: {
            correctPosition: 2,
            correctLetterWrongPosition: 1,
            incorrect: 2
          }
        },
      ]}/>
    </div>
  )
}

export default App
