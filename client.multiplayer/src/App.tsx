import { useState } from "react";
import "./App.css";
import GameServerContextProvider from "./contexts/GameServerContext";
import GameClientContextProvider from "./contexts/GameClientContext";

function App() {
  const [choice, setChoice] = useState<"server" | "client" | undefined>();

  return (
    <>
      {!choice && (
        <>
          <p>Choose set</p>
          <button onClick={() => setChoice("server")}>Server</button>
          <button onClick={() => setChoice("client")}>Client</button>
        </>
      )}
      {choice == "server" && (
        <GameServerContextProvider>
          <p>Server</p>
        </GameServerContextProvider>
      )}
      {choice == "client" && (
       <GameClientContextProvider>
        <p>Client</p>
       </GameClientContextProvider> 
      )}
     
    </>
  );
}

export default App;
