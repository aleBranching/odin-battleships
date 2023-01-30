import Gameboard from "./gameboard";
import UIcontroller from "./UIcontroller";
import enemyPlayer from "./computerPlayer";
// import enemyPlayer from "./computerPlayer";

console.log("test");
console.log("change");

// const test = getBoxDOM("enemyArea", 0, 0);

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

  const setUpPlacements = (gameboard1, gameboard2) => {
    gameboard1.placeShip(4, 0, 0, true);
    gameboard1.placeShip(3, 6, 0, true);
    gameboard1.placeShip(3, 0, 1, true);
    gameboard1.placeShip(2, 0, 3, true);
    gameboard1.placeShip(2, 0, 5, true);
    gameboard1.placeShip(2, 9, 6, false);
    gameboard1.placeShip(1, 2, 7, true);
    gameboard1.placeShip(1, 3, 8, true);
    gameboard1.placeShip(1, 4, 9, true);
    gameboard1.placeShip(1, 7, 9, true);

    gameboard2.placeShip(4, 0, 0, true);
    gameboard2.placeShip(3, 6, 0, true);
    gameboard2.placeShip(3, 0, 1, true);
    gameboard2.placeShip(2, 0, 3, true);
    gameboard2.placeShip(2, 0, 5, true);
    gameboard2.placeShip(2, 9, 6, false);
    gameboard2.placeShip(1, 2, 7, true);
    gameboard2.placeShip(1, 3, 8, true);
    gameboard2.placeShip(1, 4, 9, true);
    gameboard2.placeShip(1, 7, 9, true);
  };

  //   while (!gameOver) {
  const playerGameboard = Gameboard();
  const enemyGameboard = Gameboard();
  setUpPlacements(playerGameboard, enemyGameboard);

  UIcontroller.renderExistingBoats(playerGameboard, "playerArea");
  UIcontroller.enemyBoxDOMListener(enemyGameboard);
  console.log("happens");

  //   const enemyBot = enemyPlayer(playerGameboard);
  //   const [isHit, enemyX, enemyY] = enemyPlayer.attack();

  //   }
};

gameLoop();
