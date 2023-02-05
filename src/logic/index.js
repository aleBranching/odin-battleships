import Gameboard from "./gameboard";
import UIcontroller from "./UIcontroller";
import enemyPlayer from "./computerPlayer";
// import { cli } from "webpack";
// import enemyPlayer from "./computerPlayer";

// const test = getBoxDOM("enemyArea", 0, 0);

const randomiseBTN = document.querySelector("#randomise");
const submitPlacements = document.querySelector("#submit");
const templateDialog = document.querySelector("#templateDialog");

let templatePositions = [];
let templateArena;

randomiseBTN.addEventListener("click", () => {
  UIcontroller.resetTemplateColours();
  const testGameboard = Gameboard();
  const [result, positionGameArena] =
    testGameboard.positionAllShipsRandomlyTemplate();

  templateArena = positionGameArena;
  templatePositions = result;
  console.log("the positions", result);
  console.table(positionGameArena);
  UIcontroller.renderTemplateBoats(positionGameArena);
});

submitPlacements.addEventListener("click", () => {
  templateDialog.close();

  gameLoop(templatePositions);
});

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
    // gameboard1.placeShip(3, 6, 0, true);playerGameboard
    // gameboard1.placeShip(3, 0, 1, true);
    // gameboard1.placeShip(2, 0, 3, true);
    // gameboard1.placeShip(2, 0, 5, true);
    // gameboard1.placeShip(2, 9, 6, false);
    // gameboard1.placeShip(1, 2, 7, true);
    // gameboard1.placeShip(1, 3, 8, true);
    // gameboard1.placeShip(1, 4, 9, true);
    // gameboard1.placeShip(1, 7, 9, true);
    // // debugger;
    // gameboard1.placeShip(4, 0, 0, true);
    // debugger;

    for (let i = 0; i < 10; i++) {
      gameboard1.placeShip(
        templatePositions[i].length,
        templatePositions[i].x,
        templatePositions[i].y,
        templatePositions[i].horizontally
      );
    }

    console.table(gameboard1.gameArena);
    console.table(templateArena);

    for (let i = 0; i < 10; i++) {
      gameboard2.placeShip(
        templatePositions[i].length,
        templatePositions[i].x,
        templatePositions[i].y,
        templatePositions[i].horizontally
      );
    }

    console.log("enemyBoard");
    console.table(gameboard2.gameArena);
    console.log("object of 4 coord", gameboard2.currentShipsOBJ[1].coordinates);

    // gameboard1.placeShipRandomly(4);
    // gameboard1.placeShipRandomly(3);
    // gameboard1.placeShipRandomly(3);
    // gameboard1.placeShipRandomly(2);
    // gameboard1.placeShipRandomly(2);
    // gameboard1.placeShipRandomly(2);
    // gameboard1.placeShipRandomly(1);
    // gameboard1.placeShipRandomly(1);
    // gameboard1.placeShipRandomly(1);
    // gameboard1.placeShipRandomly(1);
    // debugger;

    // UNCOMMENT LATER: placing enemy ships randomly
    // gameboard2.placeShipRandomly(4);
    // gameboard2.placeShipRandomly(3);
    // gameboard2.placeShipRandomly(3);
    // gameboard2.placeShipRandomly(2);
    // gameboard2.placeShipRandomly(2);
    // gameboard2.placeShipRandomly(2);
    // gameboard2.placeShipRandomly(1);
    // gameboard2.placeShipRandomly(1);
    // gameboard2.placeShipRandomly(1);
    // gameboard2.placeShipRandomly(1);

    // const result = gameboard1.placeShip(1, 0, 0, true);
    // console.log(result);

    // gameboard2.placeShip(4, 0, 0, true);
    // gameboard2.placeShip(3, 6, 0, true);
    // gameboard2.placeShip(3, 0, 1, true);
    // gameboard2.placeShip(2, 0, 3, true);
    // gameboard2.placeShip(2, 0, 5, true);
    // gameboard2.placeShip(2, 9, 6, false);
    // gameboard2.placeShip(1, 2, 7, true);
    // gameboard2.placeShip(1, 3, 8, true);
    // gameboard2.placeShip(1, 4, 9, true);
    // gameboard2.placeShip(1, 7, 9, true);
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
    // console.log("attempt", e.target.dataset);
    const [x, y] = UIcontroller.getXandY(e);
    const shipIndex = UIcontroller.getBoxDOMsShipIndex(enemyGameboard, x, y);
    // console.log("evaluating", boxDom.dataset.hit);

    if (!boxDom.dataset.hit) {
      boxDom.dataset.hit = true;
      rmvEventListenerAndEnemyTurn();
      //   console.log("boom");
      const attackResult = enemyGameboard.receiveAttack(x, y);
      //   console.log("attackResult", attackResult);
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
        boxDom.style.backgroundColor = "rgb(201, 201, 178)";
        // removingEventListeners();
      }
      enemyTurn();
    }

    // console.log(shipIndex);
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

  const enemyBot = enemyPlayer(playerGameboard);
  const enemyTurn = () => {
    if (!gameOK) {
      return;
    }
    //   enemy's turn
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
      //   console.log(boxDOM);
      boxDOM.style.backgroundColor = "rgb(201, 201, 178)";
      playersTurn();
    }
  };

  playersTurn();
};

// gameLoop();
