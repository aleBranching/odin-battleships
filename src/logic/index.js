import Gameboard from "./gameboard";

console.log("test");
console.log("change");

function getBoxDOM(area, x, y) {
  return document.querySelector(
    // .row[data-x="0"] .box[data-y="0"] {
    `.${area} .row[data-x="${x}"] .box[data-y="${y}"]`
  );
}

const test = getBoxDOM("enemyArea", 0, 0);

const gameLoop = () => {
  const gameOver = false;

  // [4, 4, 4, 4, 0, 0, 0, 0, 0, 0],
  // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

  //   while (!gameOver) {
  const playerGameboard = Gameboard();
  const enemyGameboard = Gameboard();

  playerGameboard.placeShip(4, 0, 0, true);
  playerGameboard.placeShip(3, 6, 0, true);
  playerGameboard.placeShip(3, 0, 1, true);
  playerGameboard.placeShip(2, 0, 3, true);
  playerGameboard.placeShip(2, 0, 5, true);
  playerGameboard.placeShip(2, 9, 6, false);
  playerGameboard.placeShip(1, 2, 7, true);
  playerGameboard.placeShip(1, 3, 8, true);
  playerGameboard.placeShip(1, 4, 9, true);
  playerGameboard.placeShip(1, 7, 9, true);

  console.table(playerGameboard.gameArena);
  //   }
};

gameLoop();
console.log(test);
