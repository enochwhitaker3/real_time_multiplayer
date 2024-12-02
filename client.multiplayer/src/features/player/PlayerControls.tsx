import { FC, useEffect } from "react";
import { useGameServerContext } from "../../contexts/hooks/useGameServerContext";
import { updateVehicle } from "../../contexts/GameServerContext";

interface props {
  id: number;
  forwardKey: string;
  backwardKey: string;
  rightKey: string;
  leftKey: string;
  updateVehicle: (updateVehicle: updateVehicle) =>  void
}

const PlayerControls: FC<props> = (props) => {
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
      case props.forwardKey:
        props.updateVehicle({
          id: props.id,
          vehicleAction: "moveForward",
        });
        break;
      case props.leftKey:
        props.updateVehicle({ id: props.id, vehicleAction: "turnLeft" });
        break;
      case props.backwardKey:
        props.updateVehicle({
          id: props.id,
          vehicleAction: "moveBackward",
        });
        break;
      case props.rightKey:
        props.updateVehicle({ id: props.id, vehicleAction: "turnRight" });
        break;
    }
  };
  const handleKeyUp = (event: KeyboardEvent) => {
    switch (event.key) {
      case props.forwardKey:
        props.updateVehicle({
          id: props.id,
          vehicleAction: "stopForwards",
        });
        break;
      case props.leftKey:
        props.updateVehicle({ id: props.id, vehicleAction: "stopLeft" });
        break;
      case props.backwardKey:
        props.updateVehicle({
          id: props.id,
          vehicleAction: "stopBackwards",
        });
        break;
      case props.rightKey:
        props.updateVehicle({ id: props.id, vehicleAction: "stopRight" });
        break;
    }
  };
  return <div></div>;
};

export default PlayerControls;
