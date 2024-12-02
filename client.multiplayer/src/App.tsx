import { useState } from "react";
import "./App.css";
import GameServerContextProvider from "./contexts/GameServerContext";
import DisplayVehicles from "./features/vehicle/ui/DisplayVehicles";

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
          <DisplayVehicles />
        </GameServerContextProvider>
      )}
     
    </>
  );
}

export default App;
