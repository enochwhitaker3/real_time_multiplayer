import './App.css'
import { Vehicle } from './features/vehicle/ui/Vehicle'
import { PlayerVehicle } from './features/vehicle/types/PlayerVehicle'

function App() {

  const vechile =  {
    id: 1,
    xPos: 500,
    yPos: 120,
    degrees: 0,
    direction: "forward",
    acceleration: "forward" 
} as PlayerVehicle

  return (
    <>
      <Vehicle vehicle={vechile}/>      
    </>
  )
}

export default App
