import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Vehicle } from './features/vehicle/ui/Vehicle'
import { PlayerVehicle } from './features/vehicle/types/PlayerVehicle'

function App() {
  const [count, setCount] = useState(0)

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
