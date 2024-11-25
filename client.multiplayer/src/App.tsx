import "./App.css";
import GameServerContextProvider from "./contexts/GameServerContext";

function App() {


  return (
    <>
      <GameServerContextProvider>
        <p>Hi</p>
      </GameServerContextProvider>
    </>
  );
}

export default App;
