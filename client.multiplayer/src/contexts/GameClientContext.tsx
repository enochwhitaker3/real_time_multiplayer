import { createContext, ReactNode, useEffect, useState } from "react";
import { PlayerVehicle } from "../features/vehicle/types/PlayerVehicle";
import { Vehicle } from "../features/vehicle/ui/Vehicle";

interface GameClientInterface {

}

export const GameClientContextInstance = createContext<GameClientInterface>(
  {} as GameClientInterface
);

const GameClientContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentVehicle, setCurrentVehicle] = useState<PlayerVehicle[]>([]);
  const [_, setSocket] = useState<WebSocket | undefined>();

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:5169/ws");

    newSocket.addEventListener("open", () => {
      console.log("Connected to server");
    });

    newSocket.addEventListener("message", (event) => {
      try {
        const data = JSON.parse(event.data); // Ensure data is parsed
        setCurrentVehicle(data);
      } catch (err) {
        console.error("Error parsing WebSocket message:", err);
      }
    });
    

    newSocket.addEventListener("error", (error) => {
      console.error("WebSocket error: ", error);
    });

    newSocket.addEventListener("close", () => {
      console.log("WebSocket connection closed");
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
      console.log("WebSocket connection cleaned up");
    };
  }, []);

  return (
    <GameClientContextInstance.Provider
      value={{
        currentVehicle
      }}
    >
      {currentVehicle.map((v, i) => (
        <Vehicle vehicle={v} key={i} />
      ))}
      {children}
    </GameClientContextInstance.Provider>
  );
};

export default GameClientContextProvider;
