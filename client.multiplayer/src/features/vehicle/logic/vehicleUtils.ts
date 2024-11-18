import { PlayerVehicle } from "../types/PlayerVehicle";

export const moveVehicle = (vehicle: PlayerVehicle) => {
    const copyVehicle = {...vehicle}
   if(vehicle.direction == "left")
   {
    copyVehicle.degrees = copyVehicle.degrees + -3
   }
    
    

    return copyVehicle;
}