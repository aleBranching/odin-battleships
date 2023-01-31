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
        // console.log("here", aShip);
      } else {
        aShip.coordinates.forEach(updateEachDOMCoordinate);
      }
    });
  };

  const changeBoxColour = (area, x, y, colour) => {
    const hitBoxDOM = getBoxDOM(area, x, y);
    hitBoxDOM.style.backgroundColor = colour;
  };

  const toggleHovering = () => {
    const area = document.querySelector(".enemyArea");
    area.classList.toggle("hovering");
  };

  const getBoxDOMsShipIndex = (gameArena, x, y) => {
    const shipIndex = gameArena.gameArena[y][x];
    return shipIndex;
  };

  const changeAllBoxesOfShip = (shipIndex, areaClass, gameArena) => {
    const { coordinates } = gameArena.currentShipsOBJ[shipIndex];
    coordinates.forEach((aCoord) => {
      const [shipX, shipY] = aCoord;
      getBoxDOM(`${areaClass}`, shipX, shipY).style.backgroundColor = "red";
    });
  };

  const getXandY = (e) => {
    const { y } = e.target.dataset;
    const { x } = e.target.parentElement.dataset;

    return [x, y];
  };

  return {
    renderExistingBoats,
    getBoxDOM,
    getXandY,
    changeAllBoxesOfShip,
    getBoxDOMsShipIndex,
    changeBoxColour,
    toggleHovering,
  };
})();
