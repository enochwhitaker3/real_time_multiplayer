export interface PlayerVehicle {
    id: number,
    xPos: number,
    yPos: number,
    degrees: number,
    speed: number, 
    direction: "forward" | "left" | "right",
    acceleration: "forward" | "backward" | "none"
}