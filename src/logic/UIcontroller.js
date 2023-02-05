import Gameboard from "./gameboard";

export default (function UIcontroller() {
  const getBoxDOM = (area, x, y) =>
    document.querySelector(`.${area} .row[data-y="${y}"] .box[data-x="${x}"]`);

  const renderExistingBoats = (gameArena, playerAreaDOM) => {
    const updateEachDOMCoordinate = ([x, y]) => {
      // TODO: figure out why the coordinates need to be swapped here
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

  const resetTemplateColours = () => {
    // let positionArea = document.querySelector(".positionArea")

    const updateEachDOMCoordinate = (x, y) => {
      getBoxDOM("positionArea", x, y).style.backgroundColor = "white";
    };

    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        updateEachDOMCoordinate(x, y);
      }
    }
  };

  const renderTemplateBoats = (gameArenaCoordinates) => {
    const updateEachDOMCoordinate = (x, y) => {
      getBoxDOM("positionArea", x, y).style.backgroundColor = "grey";
    };

    gameArenaCoordinates.forEach((aRow, yIndex) => {
      aRow.forEach((aRowCoord, xIndex) => {
        if (gameArenaCoordinates[yIndex][xIndex] === 1) {
          updateEachDOMCoordinate(xIndex, yIndex);
        }
      });
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

  // swapped here
  const getXandY = (e) => {
    const { x } = e.target.dataset;
    const { y } = e.target.parentElement.dataset;

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
    renderTemplateBoats,
    resetTemplateColours,
  };
})();
