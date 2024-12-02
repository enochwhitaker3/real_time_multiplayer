import { createContext, ReactNode, useEffect, useState } from "react";
import { PlayerVehicle } from "../features/vehicle/types/PlayerVehicle";
import { Vehicle } from "../features/vehicle/ui/Vehicle";
import PlayerControls from "../features/player/PlayerControls";
import { Buffer } from "buffer";
import { updateVehicle } from "./GameServerContext";

interface GameClientInterface {

}

export const GameClientContextInstance = createContext<GameClientInterface>(
  {} as GameClientInterface
);

const GameClientContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentVehicle, setCurrentVehicle] = useState<PlayerVehicle[]>([]);
  const [_, setDisplaySocket] = useState<WebSocket | undefined>();
  const [movementSocket, setMovementSocket] = useState<WebSocket | undefined>();
  const [registrationSocket, setRegisterSocket] = useState<WebSocket | undefined>();
  const [registered, setRegistered] = useState(false)

  const [id] = useState<number>(Math.floor(Math.random() * 100000));

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:5169/ws");

    newSocket.addEventListener("open", () => {
      console.log("Connected to server");
    });

    newSocket.addEventListener("message", (event) => {
      try {
        const data = JSON.parse(event.data); 
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

    setDisplaySocket(newSocket);

    return () => {
      newSocket.close();
      console.log("WebSocket connection cleaned up");
    };
  }, []);

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:5169/ws/move");

    newSocket.addEventListener("open", () => {
      console.log("Connected to movement");
    });

    newSocket.addEventListener("error", (error) => {
      console.error("WebSocket error: ", error);
    });

    newSocket.addEventListener("close", () => {
      console.log("WebSocket connection closed");
    });

    setMovementSocket(newSocket);

    return () => {
      newSocket.close();
      console.log("WebSocket connection cleaned up");
    };
  }, []);

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:5169/ws/register");

    newSocket.addEventListener("open", () => {
      console.log("Connected to movement");
    });

    newSocket.addEventListener("error", (error) => {
      console.error("WebSocket error: ", error);
    });

    newSocket.addEventListener("close", () => {
      console.log("WebSocket connection closed");
    });

    setRegisterSocket(newSocket);

    return () => {
      newSocket.close();
      console.log("WebSocket connection cleaned up");
    };
  }, []);


  function handleRegstration() {
    setRegistered(true)

    const registerRequest = {
      id: id
    }

    const buffer = Buffer.from(JSON.stringify(registerRequest), "utf-8");
    if (registrationSocket && registrationSocket.readyState) {
      registrationSocket.send(buffer);
    } 
    else {
      console.log("cant send message, socket not open", registrationSocket);
    }
  }

  function handleUpdateVehicle(updateVehicle: updateVehicle) {
    const buffer = Buffer.from(JSON.stringify(updateVehicle), "utf-8");
    if (movementSocket && movementSocket.readyState) {
      movementSocket.send(buffer);
    } 
    else {
      console.log("cant send message, socket not open", movementSocket);
    }
  }

  return (
    <GameClientContextInstance.Provider
      value={{
        currentVehicle
      }}
    >
      {currentVehicle.map((v, i) => (
        <Vehicle vehicle={v} key={i} />
      ))}
      {!registered && (
        <button onClick={handleRegstration}>Register</button>)
      }
      {registered && <PlayerControls
        id={id}
        forwardKey={"w"}
        backwardKey={"s"}
        rightKey={"d"}
        leftKey={"a"}
        updateVehicle={handleUpdateVehicle}
      />}
      {children}
    </GameClientContextInstance.Provider>
  );
};

export default GameClientContextProvider;
