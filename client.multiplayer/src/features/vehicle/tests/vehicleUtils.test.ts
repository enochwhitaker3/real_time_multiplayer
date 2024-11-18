import { expect, test } from 'vitest'
import { moveVehicle } from '../logic/vehicleUtils'
import { PlayerVehicle } from '../types/PlayerVehicle'

test("Test turning left on a vehicle", () =>
{
    const testVehicle =  {
        id: 1,
        xPos: 0,
        yPos: 0,
        degrees: 0,
        direction: "left",
        acceleration: "forward" 
    } as PlayerVehicle
    
    const result = moveVehicle(testVehicle);

    expect(result.degrees).toBe(-3)
})