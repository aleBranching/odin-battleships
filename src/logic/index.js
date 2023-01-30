import Gameboard from "./gameboard";
import UIcontroller from "./UIcontroller";
import enemyPlayer from "./computerPlayer";
// import enemyPlayer from "./computerPlayer";

console.log("test");
console.log("change");

// const test = getBoxDOM("enemyArea", 0, 0);

const gameLoop = () => {
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

  //   debugger;

  //   while (!gameOver) {
  const playerGameboard = Gameboard();
  const enemyGameboard = Gameboard();
  setUpPlacements(playerGameboard, enemyGameboard);
  let gameOK = true;

  UIcontroller.renderExistingBoats(playerGameboard, "playerArea");
  //   UIcontroller.enemyBoxDOMListener(enemyGameboard);
  //   console.log("happens");

  const handlePlayerClick = (e) => {
    const boxDom = e.target;
    const [x, y] = UIcontroller.getXandY(e);
    const shipIndex = UIcontroller.getBoxDOMsShipIndex(enemyGameboard, x, y);
    console.log("evaluating", boxDom.dataset.hit);

    if (!boxDom.dataset.hit) {
      boxDom.dataset.hit = true;
      rmvEventListenerAndEnemyTurn();
      //   console.log("boom");
      const attackResult = enemyGameboard.receiveAttack(x, y);
      console.log("attackResult", attackResult);
      if (attackResult) {
        const shipOBJ = enemyGameboard.currentShipsOBJ[shipIndex];
        boxDom.style.backgroundColor = "grey";

        if (shipOBJ.isSunk()) {
          UIcontroller.changeAllBoxesOfShip(
            shipIndex,
            "enemyArea",
            enemyGameboard
          );
        }
        if (enemyGameboard.allShipsSunk()) {
          alert("game Over");
          gameOK = false;
          //   removingEventListeners();
        }
      } else {
        boxDom.style.backgroundColor = "rgb(190, 146, 154)";
        // removingEventListeners();
      }
      enemyTurn();
    }

    console.log(shipIndex);
  };

  const playersTurn = () => {
    document.querySelectorAll(`.enemyArea .row .box`).forEach((aBox) => {
      aBox.addEventListener("click", handlePlayerClick, { once: true });
    });
  };

  const rmvEventListenerAndEnemyTurn = () => {
    document.querySelectorAll(`.enemyArea .row .box`).forEach((aBox) => {
      aBox.removeEventListener("click", handlePlayerClick);
    });

    UIcontroller.toggleHovering();
  };

  const enemyTurn = () => {
    if (!gameOK) {
      return;
    }
    //   enemy's turn
    const enemyBot = enemyPlayer(playerGameboard);
    //   console.log(enemyBot);
    const [isHit, x, y] = enemyBot.attack();

    const boxDOM = UIcontroller.getBoxDOM("playerArea", x, y);

    if (isHit) {
      const enemyShipIndex = UIcontroller.getBoxDOMsShipIndex(
        playerGameboard,
        x,
        y
      );
      const shipOBJ = playerGameboard.currentShipsOBJ[enemyShipIndex];

      boxDOM.style.backgroundColor = "pink";
      playersTurn();
      if (shipOBJ.isSunk()) {
        UIcontroller.changeAllBoxesOfShip(
          enemyShipIndex,
          "playerArea",
          playerGameboard
        );
      }
    } else {
      console.log(boxDOM);
      boxDOM.style.backgroundColor = "rgb(190, 146, 154)";
      playersTurn();
    }
  };

  playersTurn();
};

gameLoop();
