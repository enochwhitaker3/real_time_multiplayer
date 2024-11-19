import { useContext } from "react";
import { GameServerContextInstance } from "../GameServerContext";

export const useGameServerContext = () => {
  const GameContext = useContext(GameServerContextInstance);
  return GameContext;
};
