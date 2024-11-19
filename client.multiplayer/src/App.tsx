import "./App.css";
import { Vehicle } from "./features/vehicle/ui/Vehicle";
import { PlayerVehicle } from "./features/vehicle/types/PlayerVehicle";
import GameServerContextProvider from "./contexts/GameServerContext";
import DisplayVehicles from "./features/vehicle/ui/DisplayVehicles";

function App() {
  const vechile = {
    id: 1,
    xPos: 500,
    yPos: 120,
    degrees: 0,
    direction: "forward",
    acceleration: "forward",
  } as PlayerVehicle;

  return (
    <>
      <GameServerContextProvider>
        <DisplayVehicles />
      </GameServerContextProvider>
    </>
  );
}

export default App;
