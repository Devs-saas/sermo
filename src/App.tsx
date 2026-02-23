import { GameAreaComponent } from "./components/game-area/GameAreaComponent"
import { HeaderComponent } from "./components/header/HeaderComponent"

function App() {
  return (
    <div className="bg-[var(--brand-bg)] h-full font-['Inter',system-ui,sans-serif]">
      <HeaderComponent />
      <GameAreaComponent />
    </div>
  )
}

export default App
