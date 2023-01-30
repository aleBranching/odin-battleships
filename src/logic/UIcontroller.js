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

  const enemyBoxDOMListener = (gameArena) => {
    const getXandY = (e) => {
      const { y } = e.target.dataset;
      const { x } = e.target.parentElement.dataset;

      //   console.log("the coord", x, y);
      return [x, y];
    };

    document.querySelectorAll(".enemyArea .row .box").forEach((aBox) => {
      aBox.addEventListener("click", (e) => {
        if (e.target.dataset.hit !== true) {
          const [x, y] = getXandY(e);
          e.target.dataset.hit = "true";

          gameArena.receiveAttack(x, y);
          //   debugger;
          console.log("the x and Y", x, y);
        }
      });
    });
  };

  return { renderExistingBoats, getBoxDOM, enemyBoxDOMListener };
})();
