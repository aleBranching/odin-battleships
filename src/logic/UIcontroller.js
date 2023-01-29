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

  return { renderExistingBoats, getBoxDOM };
})();
