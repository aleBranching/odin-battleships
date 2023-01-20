import Ship from "../logic/ship";

test("create check if a ship is sunk", () => {
  let testShip = Ship(3);
  expect(testShip.isSunk()).toBe(false);
});

test("create check if a ship is sunk", () => {
  let testShip = Ship(3);
  testShip.hit();
  testShip.hit();
  testShip.hit();

  expect(testShip.isSunk()).toBe(true);
});
