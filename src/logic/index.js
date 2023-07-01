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
  // console.log("the positions", result);
  // console.table(positionGameArena);
  UIcontroller.renderTemplateBoats(positionGameArena);
});

submitPlacements.addEventListener("click", () => {
  templateDialog.close();

  gameLoop(templatePositions);
});

const gameLoop = () => {
  const setUpPlacements = (gameboard1, gameboard2) => {
    for (let i = 0; i < 10; i++) {
      gameboard1.placeShip(
        templatePositions[i].length,
        templatePositions[i].x,
        templatePositions[i].y,
        templatePositions[i].horizontally
      );
    }

    gameboard2.placeShipRandomly(4);
    gameboard2.placeShipRandomly(3);
    gameboard2.placeShipRandomly(3);
    gameboard2.placeShipRandomly(2);
    gameboard2.placeShipRandomly(2);
    gameboard2.placeShipRandomly(2);
    gameboard2.placeShipRandomly(1);
    gameboard2.placeShipRandomly(1);
    gameboard2.placeShipRandomly(1);
    gameboard2.placeShipRandomly(1);
  };

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
