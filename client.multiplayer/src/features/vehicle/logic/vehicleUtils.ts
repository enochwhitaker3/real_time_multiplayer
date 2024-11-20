import { PlayerVehicle } from "../types/PlayerVehicle";



export const moveVehicle = (vehicle: PlayerVehicle, variables: {gameTick: number, userSpeed: number, turnSpeed: number}) => {
  const copyVehicle = { ...vehicle };
  if (vehicle.direction == "left") {
    copyVehicle.degrees = copyVehicle.degrees - variables.turnSpeed;
  } else if (vehicle.direction == "right") {
    copyVehicle.degrees = copyVehicle.degrees + variables.turnSpeed;
  }

  if (vehicle.acceleration == "forward") {
    copyVehicle.speed += variables.userSpeed;
  }

  if (vehicle.acceleration == "backward") {
    copyVehicle.speed -= variables.userSpeed;
  }

  if (vehicle.acceleration == "none") {
    let deltaSpeed = (7 * copyVehicle.speed) / Math.abs(copyVehicle.speed);
    if (copyVehicle.speed <= 7 && copyVehicle.speed >= -7) {
      deltaSpeed = copyVehicle.speed ?? 0;
    }
    copyVehicle.speed -= deltaSpeed;
  }
  const degreeRads = copyVehicle.degrees * (Math.PI / 180);
  copyVehicle.xPos += copyVehicle.speed * Math.cos(degreeRads);
  copyVehicle.yPos += copyVehicle.speed * Math.sin(degreeRads);

  return copyVehicle;
};
