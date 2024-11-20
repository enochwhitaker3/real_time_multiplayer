import { expect, test } from "vitest";
import { moveVehicle } from "../logic/vehicleUtils";
import { PlayerVehicle } from "../types/PlayerVehicle";

const GameTestVariables = {
  gameTick: 10,
  userSpeed: 15,
  turnSpeed: 3,
};

test("Test turning left on a vehicle", () => {
  const testVehicle = {
    id: 1,
    xPos: 0,
    yPos: 0,
    degrees: 0,
    speed: -14,
    direction: "left",
    acceleration: "forward",
  } as PlayerVehicle;

  const result = moveVehicle(testVehicle, GameTestVariables);

  expect(result.degrees).toBe(-3);
});

test("Test turning right on a vehicle", () => {
  const testVehicle = {
    id: 1,
    xPos: 0,
    yPos: 0,
    degrees: 0,
    speed: 0,
    direction: "right",
    acceleration: "forward",
  } as PlayerVehicle;

  const result = moveVehicle(testVehicle, GameTestVariables);

  expect(result.degrees).toBe(3);
});

test("Test not turning on a vehicle", () => {
  const testVehicle = {
    id: 1,
    xPos: 0,
    yPos: 0,
    degrees: 0,
    speed: 0,
    direction: "forward",
    acceleration: "forward",
  } as PlayerVehicle;

  const result = moveVehicle(testVehicle, GameTestVariables);

  expect(result.degrees).toBe(0);
});

test("Test moving on 45 degree angle", () => {
  const testVehicle = {
    id: 1,
    xPos: 0,
    yPos: 0,
    degrees: 45,
    speed: -14,
    direction: "forward",
    acceleration: "forward",
  } as PlayerVehicle;

  const result = moveVehicle(testVehicle, GameTestVariables);

  expect(result.xPos).toBeCloseTo(Math.sqrt(2) / 2);
  expect(result.yPos).toBeCloseTo(Math.sqrt(2) / 2);
  expect(result.speed).toBe(1);
});

test("Test moving on 225 degree angle", () => {
  const testVehicle = {
    id: 1,
    xPos: 0,
    yPos: 0,
    degrees: 225,
    speed: -14,
    direction: "forward",
    acceleration: "forward",
  } as PlayerVehicle;

  const result = moveVehicle(testVehicle, GameTestVariables);

  expect(result.xPos).toBeCloseTo(-Math.sqrt(2) / 2);
  expect(result.yPos).toBeCloseTo(-Math.sqrt(2) / 2);
  expect(result.speed).toBe(1);
});

test("Test moving on 225 degree angle", () => {
  const testVehicle = {
    id: 1,
    xPos: 0,
    yPos: 0,
    degrees: -45,
    speed: -14,
    direction: "forward",
    acceleration: "forward",
  } as PlayerVehicle;

  const result = moveVehicle(testVehicle, GameTestVariables);

  expect(result.xPos).toBeCloseTo(Math.sqrt(2) / 2);
  expect(result.yPos).toBeCloseTo(-Math.sqrt(2) / 2);
  expect(result.speed).toBe(1);
});

test("Test acceleration going up", () => {
  const testVehicle = {
    id: 1,
    xPos: 0,
    yPos: 0,
    degrees: -45,
    speed: 0,
    direction: "forward",
    acceleration: "forward",
  } as PlayerVehicle;

  const result = moveVehicle(testVehicle, GameTestVariables);

  expect(result.speed).toBe(15);

  const result2 = moveVehicle(result, GameTestVariables);

  expect(result2.speed).toBe(30);
});

test("Test acceleration going down", () => {
  const testVehicle = {
    id: 1,
    xPos: 0,
    yPos: 0,
    degrees: -45,
    speed: 1,
    direction: "forward",
    acceleration: "backward",
  } as PlayerVehicle;

  const result = moveVehicle(testVehicle, GameTestVariables);

  expect(result.speed).toBe(-14);
});
