import { GameBoard } from "./components/organisms/GameBoard"
import { HeaderComponent } from "./components/organisms/HeaderComponent"
import { Keyboard } from "./components/organisms/Keyboard.tsx"

function App() {
    return (
        <div className="h-full font-['Inter',system-ui,sans-serif]">
            <HeaderComponent />
            <GameBoard />
            <Keyboard />
        </div>
    )
}

export default App
