import Gameboard from "../logic/gameboard";

test("Gameboard added ship of length 2 horizontally to 0,0", () => {
  const GameboardTestOBJ = Gameboard();
  GameboardTestOBJ.placeShip(2, 0, 0, true);

  expect(GameboardTestOBJ.gameArena).toStrictEqual([
    [4, 4, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
});

test("Gameboard added ship of length 4 vertically to 0,6", () => {
  const GameboardTestOBJ = Gameboard();
  GameboardTestOBJ.placeShip(4, 0, 6, false);

  expect(GameboardTestOBJ.gameArena).toStrictEqual([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
});

test("added 2 ship of length 3 vertically to 0,9", () => {
  const GameboardTestOBJ = Gameboard();
  GameboardTestOBJ.placeShip(3, 9, 0, false);
  GameboardTestOBJ.placeShip(3, 9, 7, false);

  expect(GameboardTestOBJ.gameArena).toStrictEqual([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
  ]);
});

test("added 2 ship of length 3 horizontaly by the right edge", () => {
  const GameboardTestOBJ = Gameboard();
  GameboardTestOBJ.placeShip(3, 7, 0, true);
  GameboardTestOBJ.placeShip(3, 7, 3, true);

  expect(GameboardTestOBJ.gameArena).toStrictEqual([
    [0, 0, 0, 0, 0, 0, 0, 2, 2, 2],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 3, 3, 3],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
});

test("added too many ships of length 3 horizontaly by the right edge", () => {
  const GameboardTestOBJ = Gameboard();
  GameboardTestOBJ.placeShip(3, 7, 0, true);
  GameboardTestOBJ.placeShip(3, 7, 3, true);
  GameboardTestOBJ.placeShip(3, 7, 4, true);

  expect(GameboardTestOBJ.gameArena).toStrictEqual([
    [0, 0, 0, 0, 0, 0, 0, 2, 2, 2],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 3, 3, 3],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
});

test("added 2 ship of length 3 horizontaly by the right edge", () => {
  const GameboardTestOBJ = Gameboard();
  GameboardTestOBJ.placeShip(3, 7, 0, true);
  GameboardTestOBJ.placeShip(3, 7, 3, true);
  GameboardTestOBJ.receiveAttack(0, 0);

  expect(GameboardTestOBJ.missedShots).toStrictEqual([[0, 0]]);
});

test("checking a missed shot", () => {
  const GameboardTestOBJ = Gameboard();
  GameboardTestOBJ.placeShip(3, 7, 0, true);
  GameboardTestOBJ.placeShip(3, 7, 3, true);
  GameboardTestOBJ.receiveAttack(0, 0);

  expect(GameboardTestOBJ.missedShots).toStrictEqual([[0, 0]]);
});

test("hitting a ship", () => {
  const GameboardTestOBJ = Gameboard();
  GameboardTestOBJ.placeShip(3, 7, 0, true);
  GameboardTestOBJ.placeShip(3, 7, 3, true);
  GameboardTestOBJ.receiveAttack(7, 0);
  GameboardTestOBJ.receiveAttack(8, 0);
  GameboardTestOBJ.receiveAttack(9, 0);

  expect(GameboardTestOBJ.currentShipsOBJ[2].isSunk()).toEqual(true);
});

test("all ships sunk", () => {
  const GameboardTestOBJ = Gameboard();
  GameboardTestOBJ.placeShip(3, 7, 0, true);
  GameboardTestOBJ.placeShip(3, 7, 3, true);
  GameboardTestOBJ.receiveAttack(7, 0);
  GameboardTestOBJ.receiveAttack(8, 0);
  GameboardTestOBJ.receiveAttack(9, 0);

  GameboardTestOBJ.receiveAttack(7, 3);
  GameboardTestOBJ.receiveAttack(8, 3);
  GameboardTestOBJ.receiveAttack(9, 3);

  expect(GameboardTestOBJ.currentShipsOBJ[2].isSunk()).toEqual(true);
});
