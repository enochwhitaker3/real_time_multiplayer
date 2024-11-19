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

  const handleKeyDown = (event: any) => {
    gameContext.updateVehicle({ id: 1, vehicleAction: "moveForward" });
  };
  const handleKeyUp = (event: any) => {};
  return <div>Controls</div>;
};

export default PlayerControls;
