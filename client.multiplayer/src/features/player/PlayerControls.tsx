import { useEffect } from "react";
import { useGameServerContext } from "../../contexts/hooks/useGameServerContext";

const PlayerControls = () => {
  const gameContext = useGameServerContext();
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case "w":
        gameContext.updateVehicle({ id: 1, vehicleAction: "moveForward" });
        break;
      case "a":
        gameContext.updateVehicle({ id: 1, vehicleAction: "turnLeft" });
        break;
      case "s":
        gameContext.updateVehicle({ id: 1, vehicleAction: "moveBackward" });
        break;
      case "d":
        gameContext.updateVehicle({ id: 1, vehicleAction: "turnRight" });
        break;
    }
  };
  const handleKeyUp = (event: KeyboardEvent) => {
    switch (event.key) {
      case "w":
        gameContext.updateVehicle({ id: 1, vehicleAction: "stopForwards" });
        break;
      case "a":
        gameContext.updateVehicle({ id: 1, vehicleAction: "stopLeft" });
        break;
      case "s":
        gameContext.updateVehicle({ id: 1, vehicleAction: "stopBackwards" });
        break;
      case "d":
        gameContext.updateVehicle({ id: 1, vehicleAction: "stopRight" });
        break;
    }
  };
  return <div>Controls</div>;
};

export default PlayerControls;
