import { PlayerVehicle } from "../types/PlayerVehicle";

export const moveVehicle = (vehicle: PlayerVehicle) => {
  const copyVehicle = { ...vehicle };
  if (vehicle.direction == "left") {
    copyVehicle.degrees = copyVehicle.degrees - 3;
  } else if (vehicle.direction == "right") {
    copyVehicle.degrees = copyVehicle.degrees + 3;
  }

  if (vehicle.acceleration == "forward") {
    copyVehicle.speed += 1;
  }

  if (vehicle.acceleration == "backward") {
    copyVehicle.speed -=1;
  }
  const degreeRads = copyVehicle.degrees * (Math.PI / 180);
  copyVehicle.xPos += copyVehicle.speed * Math.cos(degreeRads);
  copyVehicle.yPos += copyVehicle.speed * Math.sin(degreeRads);

  return copyVehicle;
};
