import Gameboard from "./gameboard";

export default (function UIcontroller() {
  const getBoxDOM = (area, x, y) =>
    document.querySelector(`.${area} .row[data-x="${x}"] .box[data-y="${y}"]`);

  const renderExistingBoats = (gameArena, playerAreaDOM) => {
    const updateEachDOMCoordinate = ([x, y]) => {
      getBoxDOM(playerAreaDOM, x, y).style.backgroundColor = "grey";
    };

    gameArena.currentShipsOBJ.forEach((aShip) => {
      if (aShip == null) {
        // null
      } else {
        aShip.coordinates.forEach(updateEachDOMCoordinate);
      }
    });
  };

  let turnAllowed = true;
  const enemyBoxDOMListener = (gameArena) => {
    const getXandY = (e) => {
      const { y } = e.target.dataset;
      const { x } = e.target.parentElement.dataset;

      return [x, y];
    };

    const renderingHits = (e) => {
      if (e.target.dataset.hit !== true) {
        turnAllowed = false;
        const [x, y] = getXandY(e);
        e.target.dataset.hit = "true";

        const attackResult = gameArena.receiveAttack(x, y);

        const hitBoxDOM = getBoxDOM("enemyArea", x, y);
        if (attackResult) {
          hitBoxDOM.style.backgroundColor = "gray";
          const shipIndex = gameArena.gameArena[y][x];

          if (gameArena.currentShipsOBJ[shipIndex].isSunk()) {
            const { coordinates } = gameArena.currentShipsOBJ[shipIndex];

            coordinates.forEach((aCoord) => {
              const [shipX, shipY] = aCoord;
              getBoxDOM("enemyArea", shipX, shipY).style.backgroundColor =
                "red";
            });
          }
          if (gameArena.allShipsSunk()) {
            // alert("gameOver");
          }
        } else {
          hitBoxDOM.style.backgroundColor = "rgb(190, 146, 154)";
        }
      }
    };

    document.querySelectorAll(`.enemyArea .row .box`).forEach((aBox) => {
      aBox.addEventListener(
        "click",
        (e) => {
          //   console.log("here");
          if (turnAllowed) {
            renderingHits(e);
          }
        },
        { once: true }
      );
    });
  };

  const renderingEnemyHits = (x, y) => {
    if (true) {
      //   turnAllowed = false;
      //   const [x, y] = getXandY(e);
      //   e.target.dataset.hit = "true";

      const attackResult = gameArena.receiveAttack(x, y);

      const hitBoxDOM = getBoxDOM("enemyArea", x, y);
      if (attackResult) {
        hitBoxDOM.style.backgroundColor = "gray";
        const shipIndex = gameArena.gameArena[y][x];

        if (gameArena.currentShipsOBJ[shipIndex].isSunk()) {
          const { coordinates } = gameArena.currentShipsOBJ[shipIndex];

          coordinates.forEach((aCoord) => {
            const [shipX, shipY] = aCoord;
            getBoxDOM("enemyArea", shipX, shipY).style.backgroundColor = "red";
          });
        }
        if (gameArena.allShipsSunk()) {
          // alert("gameOver");
        }
      } else {
        hitBoxDOM.style.backgroundColor = "rgb(190, 146, 154)";
      }
    }
  };

  return { renderExistingBoats, getBoxDOM, enemyBoxDOMListener, turnAllowed };
})();
