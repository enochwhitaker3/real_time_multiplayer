import { useGameServerContext } from "../../../contexts/hooks/useGameServerContext";
import { Vehicle } from "./Vehicle";

const DisplayVehicles = () => {
  const gameContext = useGameServerContext();
  return <Vehicle vehicle={gameContext.currentVehicle} />;
};

export default DisplayVehicles;
