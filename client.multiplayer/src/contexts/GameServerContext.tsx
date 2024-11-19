import { createContext, ReactNode, useContext, useState } from "react";
import { PlayerVehicle } from "../features/vehicle/types/PlayerVehicle";
import { moveVehicle } from "../features/vehicle/logic/vehicleUtils";
import PlayerControls from "../features/player/PlayerControls";

interface GameServerInterface {
  currentVehicle: PlayerVehicle;
  updateVehicle: (updateVehicle: updateVehicle) => void;
}

interface updateVehicle {
  id: number;
  vehicleAction:
    | "moveForward" // 'w' pressed
    | "moveBackward" // 's' pressed
    | "turnLeft" // 'a' pressed
    | "turnRight" // 'd' pressed
    | "stopForwards" // when user lets go of 'w' key
    | "stopBackwards" // when user lets go of 's' key
    | "stopLeft" // when user lets go of 'a' key
    | "stopRight"; // when user lets go of 'd' key
}

export const GameServerContextInstance = createContext<GameServerInterface>(
  {} as GameServerInterface
);

const GameServerContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentVehicle, setCurrentVehicle] = useState<PlayerVehicle>({
    id: 1,
    xPos: 0,
    yPos: 0,
    degrees: 0,
    speed: 100,
    direction: "forward",
    acceleration: "backward",
  });
  const updateVehicle = (updateVehicle: updateVehicle) => {
    //movement decision logic
    if (updateVehicle.vehicleAction == "moveForward") {
      setCurrentVehicle((cv) => ({
        ...cv,
        acceleration: "forward",
        direction: "forward",
      }));
    }
    setCurrentVehicle((cv) => moveVehicle(cv));
  };
  return (
    <GameServerContextInstance.Provider
      value={{
        currentVehicle,
        updateVehicle,
      }}
    >
      <PlayerControls />
      {children}
    </GameServerContextInstance.Provider>
  );
};

export default GameServerContextProvider;
