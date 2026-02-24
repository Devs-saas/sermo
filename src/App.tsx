import { GameBoard } from "./components/organisms/GameBoard"
import { HeaderComponent } from "./components/organisms/HeaderComponent"

function App() {
  return (
    <div className="h-full font-['Inter',system-ui,sans-serif]">
      <HeaderComponent />
      <GameBoard />
    </div>
  )
}

export default App
