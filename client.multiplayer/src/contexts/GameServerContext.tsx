import { createContext, ReactNode, useEffect, useState } from "react";
import { PlayerVehicle } from "../features/vehicle/types/PlayerVehicle";
import { moveVehicle } from "../features/vehicle/logic/vehicleUtils";
import PlayerControls from "../features/player/PlayerControls";
import { Vehicle } from "../features/vehicle/ui/Vehicle";
import { Buffer } from "buffer";

interface GameServerInterface {
  currentVehicle: PlayerVehicle[];
  updateVehicle: (updateVehicle: updateVehicle) => void;
  registerVehicle: (id: number) => void;
}

interface updateVehicle {
  id: number;
  vehicleAction:
    | "moveForward" // 'w' pressed
    | "moveBackward" // 's' pressed
    | "turnLeft" // 'a' pressed
    | "turnRight" // 'd' pressed
    | "stopForwards" // when user lets go of 'w' key
    | "stopBackwards" // when user lets go of 's' key
    | "stopLeft" // when user lets go of 'a' key
    | "stopRight"; // when user lets go of 'd' key
}

export const GameServerContextInstance = createContext<GameServerInterface>(
  {} as GameServerInterface
);

const GameVariables = {
  gameTick: 10,
  userSpeed: 0.1,
  turnSpeed: 3,
};

const GameServerContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentVehicle, setCurrentVehicle] = useState<PlayerVehicle[]>([]);
  const [socket, setSocket] = useState<WebSocket | undefined>();
  const [_, setIsConnected] = useState(false);

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:5169/ws");

    newSocket.addEventListener("open", () => {
      console.log("Connected to server");
      setIsConnected(true);
    });

    newSocket.addEventListener("message", () => {});

    newSocket.addEventListener("error", (error) => {
      console.error("WebSocket error: ", error);
      setIsConnected(false);
    });

    newSocket.addEventListener("close", () => {
      console.log("WebSocket connection closed");
      setIsConnected(false);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
      console.log("WebSocket connection cleaned up");
    };
  }, []);

  const updateVehicle = (updateVehicle: updateVehicle) => {
    if (updateVehicle.vehicleAction === "moveBackward") {
      setCurrentVehicle((cv) =>
        cv.map((v) => {
          if (v.id == updateVehicle.id) {
            return {
              ...v,
              acceleration: "backward",
            };
          } else {
            return v;
          }
        })
      );
    }
    if (updateVehicle.vehicleAction === "moveForward") {
      setCurrentVehicle((cv) =>
        cv.map((v) => {
          if (v.id == updateVehicle.id) {
            return {
              ...v,
              acceleration: "forward",
            };
          } else {
            return v;
          }
        })
      );
    }
    if (updateVehicle.vehicleAction === "turnRight") {
      setCurrentVehicle((cv) =>
        cv.map((v) => {
          if (v.id == updateVehicle.id) {
            return {
              ...v,
              direction: "right",
            };
          } else {
            return v;
          }
        })
      );
    }
    if (updateVehicle.vehicleAction === "turnLeft") {
      setCurrentVehicle((cv) =>
        cv.map((v) => {
          if (v.id == updateVehicle.id) {
            return {
              ...v,
              direction: "left",
            };
          } else {
            return v;
          }
        })
      );
    }

    if (
      updateVehicle.vehicleAction == "stopLeft" ||
      updateVehicle.vehicleAction == "stopRight"
    ) {
      setCurrentVehicle((cv) =>
        cv.map((v) => {
          if (v.id == updateVehicle.id) {
            return {
              ...v,
              direction: "forward",
            };
          } else {
            return v;
          }
        })
      );
    }

    if (
      updateVehicle.vehicleAction == "stopForwards" ||
      updateVehicle.vehicleAction == "stopBackwards"
    ) {
      setCurrentVehicle((cv) =>
        cv.map((v) => {
          if (v.id == updateVehicle.id) {
            return {
              ...v,
              acceleration: "none",
            };
          } else {
            return v;
          }
        })
      );
    }
  };

  const registerVehicle = (id: number) => {
    if (currentVehicle.some((x) => x.id == id)) {
      return;
    }
    setCurrentVehicle((cv) => [
      ...cv,
      {
        id: id,
        xPos: 0,
        yPos: 0,
        degrees: 0,
        speed: 0,
        direction: "forward",
        acceleration: "none",
      },
    ]);
  };

  const GameLoop = () => {
    const timeot = setTimeout(() => {
      setCurrentVehicle((cv) => {
        const gameState = cv.map((v) => {
          const variable = moveVehicle(v, GameVariables);
          return variable;
        });

        const buffer = Buffer.from(JSON.stringify(gameState), "utf-8");
        if (socket && socket.readyState) {
          socket.send(buffer);
        } 
        else {
          console.log("cant send message, socket not open", socket);
        }
        return gameState;
      });
      GameLoop();
    }, GameVariables.gameTick);
    return timeot
  };

  useEffect(() => {
    const timeout = GameLoop();

    return () => 
    {
      clearTimeout(timeout)
    }
  }, [socket]);

  const [id] = useState<number>(Math.floor(Math.random() * 100000));
  return (
    <GameServerContextInstance.Provider
      value={{
        currentVehicle,
        updateVehicle,
        registerVehicle,
      }}
    >
      {currentVehicle.map((v, i) => (
        <Vehicle vehicle={v} key={i} />
      ))}
      <PlayerControls
        id={id}
        forwardKey={"w"}
        backwardKey={"s"}
        rightKey={"d"}
        leftKey={"a"}
      />
      {children}
    </GameServerContextInstance.Provider>
  );
};

export default GameServerContextProvider;
