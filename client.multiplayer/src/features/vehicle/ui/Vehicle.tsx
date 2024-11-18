import { PlayerVehicle } from "../types/PlayerVehicle";
import { Pacman } from "./Pacman";

export const Vehicle = ({vehicle}: {vehicle: PlayerVehicle}) => {
  return (
    <div
      style={{
        position: "fixed",
        rotate: `${vehicle.degrees}deg`,
        fill: "#999999",
        width: `100px`,
        height: `100px`,
        left: `${vehicle.xPos}px`,
        top: `${vehicle.yPos}px`,
      }}
    >
      <Pacman />
    </div>
  );
};
