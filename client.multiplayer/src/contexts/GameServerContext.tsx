import { createContext, ReactNode, useEffect, useState } from "react";
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

const GameVariables = {
  gameTick: 10,
  userSpeed: 0.1,
  turnSpeed: 3,
};

const GameServerContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentVehicle, setCurrentVehicle] = useState<PlayerVehicle>({
    id: 1,
    xPos: 0,
    yPos: 0,
    degrees: 0,
    speed: 0,
    direction: "forward",
    acceleration: "none",
  });
  const updateVehicle = (updateVehicle: updateVehicle) => {

    if (updateVehicle.vehicleAction === "moveBackward") {
      setCurrentVehicle((cv) => ({
        ...cv,
        acceleration: "backward",
      }));
    }
    if (updateVehicle.vehicleAction === "moveForward") {
      setCurrentVehicle((cv) => ({
        ...cv,
        acceleration: "forward",
      }));
    }
    if (updateVehicle.vehicleAction === "turnRight") {
      setCurrentVehicle((cv) => ({
        ...cv,
        direction: "right",
      }));
    }
    if (updateVehicle.vehicleAction === "turnLeft") {
      setCurrentVehicle((cv) => ({
        ...cv,
        direction: "left",
      }));
    }

    if (
      updateVehicle.vehicleAction == "stopLeft" ||
      updateVehicle.vehicleAction == "stopRight"
    ) {
      setCurrentVehicle((cv) => ({
        ...cv,
        direction: "forward",
      }));
    }

    if (
      updateVehicle.vehicleAction == "stopForwards" ||
      updateVehicle.vehicleAction == "stopBackwards"
    ) {
      setCurrentVehicle((cv) => ({
        ...cv,
        acceleration: "none",
      }));
    }
  };

  const GameLoop = () => 
  {
    setTimeout(() => {
      setCurrentVehicle((cv) => {
        return moveVehicle(cv, GameVariables);
      });
      GameLoop()
    }, GameVariables.gameTick);
  }
  useEffect(() => 
  {
    GameLoop()
  }, [])
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
