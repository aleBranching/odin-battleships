import Ship from "./ship";

export default function Gameboard() {
  // each number corresponds to index of currentShipsOBJ
  const gameArena = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  const positionGameArena = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  const currentShipsOBJ = [
    null,
    Ship(4),
    Ship(3),
    Ship(3),
    Ship(2),
    Ship(2),
    Ship(2),
    Ship(1),
    Ship(1),
    Ship(1),
    Ship(1),
  ];

  const newShipIndex = (length) => {
    let index;
    for (let i = 0; i <= 10; i++) {
      // console.log("THIS", currentShipsOBJ[i]._length);
      if (currentShipsOBJ[i] == null) {
        continue;
      }
      if (
        currentShipsOBJ[i]._length === length &&
        currentShipsOBJ[i].placed === false
      ) {
        index = i;
        break;
      }
    }
    return index;
  };

  const _placedShips = [];

  const shipNumberRulesPassed = (length) => {
    const _allowedOccurances = {
      1: 4,
      2: 3,
      3: 2,
      4: 1,
    };
    let lengthOcccured = 0;
    const _occurances = (targetLength) => {
      // let counter = 0;

      for (let i = 0; i < _placedShips.length; i++) {
        if (_placedShips[i] === length) {
          lengthOcccured++;
        }
      }
    };
    _occurances();

    if (lengthOcccured < _allowedOccurances[length]) {
      return true;
    }

    return false;
  };

  const getRandomCoord = () => {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    return [x, y];
  };

  const getTrueOrFalse = () => {
    const number = Math.floor(Math.random() * 2);
    if (number === 1) {
      return true;
    }
    return false;
  };

  const placeShipRandomly = (length) => {
    const [x, y] = getRandomCoord();
    const horizontally = getTrueOrFalse();

    try {
      placeShip(length, x, y, horizontally);
    } catch (e) {
      return placeShipRandomly(length);
    }
  };

  const placeShip = (length, x, y, horizontally) => {
    // test validity of co-ord or amount of ships
    if (x < 0 || y < 0 || x > 10 || y > 10) {
      throw new Error((e) => {
        console.error(
          "can't place ship here or no more of these ships or ship too big"
        );
      });
    }

    if (!shipNumberRulesPassed) {
      throw new Error((e) => {
        console.error("can't put anymore of these ships");
      });
    }

    let checkedCoord;

    const checkCoord = () => {
      // what would they be naively

      const naiveCoor = (() => {
        const result = [];

        if (!horizontally) {
          let newY = y;
          for (let i = 0; i < length; i++) {
            result.push([x, newY]);
            newY++;
            if (newY > 10) {
              throw new Error("boat out of game!");
            }
          }
        } else if (horizontally) {
          let newX = x;
          for (let i = 0; i < length; i++) {
            result.push([newX, y]);
            newX++;
            if (newX > 10) {
              throw new Error("Boat out of game!");
            }
          }
        }

        return result;
      })();

      const checkForOverlap = () => {
        let allowed = true;

        naiveCoor.forEach((coordinate) => {
          const anX = coordinate[0];
          const anY = coordinate[1];

          // in gamearena first have to access Y

          if (gameArena[anY][anX] !== 0) {
            allowed = false;
          }
        });

        return allowed;
      };

      if (checkForOverlap()) {
        checkedCoord = [...naiveCoor];
        return true;
      }

      return false;
    };

    // console.log("THIS", shipNumberRulesPassed(length));
    if (checkCoord() && shipNumberRulesPassed(length)) {
      const shipOBJIndex = newShipIndex(length);
      currentShipsOBJ[shipOBJIndex].placed = true;
      _placedShips.push(length);

      currentShipsOBJ[shipOBJIndex].coordinates = checkedCoord;
      checkedCoord.forEach((aCoordinate) => {
        const newx = aCoordinate[0];
        const newy = aCoordinate[1];

        gameArena[newy][newx] = shipOBJIndex;
      });
    } else {
      throw new Error("most likely ship is overlaping");
    }
  };

  const positionShipRandomly = (fakeArena, length, x, y, horizontally) => {
    // test validity of co-ord or amount of ships
    if (x < 0 || y < 0 || x > 10 || y > 10) {
      throw new Error((e) => {
        console.error(
          "can't place ship here or no more of these ships or ship too big"
        );
      });
    }

    let checkedCoord;

    const checkCoord = () => {
      // what would they be naively

      const naiveCoor = (() => {
        const result = [];

        if (!horizontally) {
          let newY = y;
          for (let i = 0; i < length; i++) {
            result.push([x, newY]);
            newY++;
            if (newY > 10) {
              throw new Error("boat out of game!");
            }
          }
        } else if (horizontally) {
          let newX = x;
          for (let i = 0; i < length; i++) {
            result.push([newX, y]);
            newX++;
            if (newX > 10) {
              throw new Error("Boat out of game!");
            }
          }
        }

        return result;
      })();

      const checkForOverlap = () => {
        let allowed = true;

        naiveCoor.forEach((coordinate) => {
          const anX = coordinate[0];
          const anY = coordinate[1];

          // in gamearena first have to access Y

          if (positionGameArena[anY][anX] !== 0) {
            allowed = false;
          }
        });

        return allowed;
      };

      if (checkForOverlap()) {
        checkedCoord = [...naiveCoor];
        return true;
      }

      return false;
    };

    // console.log("THIS", shipNumberRulesPassed(length));
    if (checkCoord()) {
      // const shipOBJIndex = newShipIndex(length);
      // currentShipsOBJ[shipOBJIndex].placed = true;
      // _placedShips.push(length);

      // currentShipsOBJ[shipOBJIndex].coordinates = checkedCoord;
      checkedCoord.forEach((aCoordinate) => {
        const newx = aCoordinate[0];
        const newy = aCoordinate[1];

        gameArena[newy][newx] = 1;
      });
    } else {
      throw new Error("most likely ship is overlaping");
    }
  };
  const missedShots = [];

  const receiveAttack = (x, y) => {
    if (gameArena[y][x] !== 0) {
      const shipOBJIndex = gameArena[y][x];
      currentShipsOBJ[shipOBJIndex].hit();
      return true;
    }
    missedShots.push([x, y]);
    return false;
  };

  const allShipsSunk = () => {
    let counter = 0;
    for (let i = 1; i < 11; i++) {
      if (currentShipsOBJ[i].isSunk()) {
        counter++;
      }
    }
    if (counter >= 10) {
      return true;
    }
    return false;
  };

  return {
    placeShip,
    gameArena,
    receiveAttack,
    allShipsSunk,
    missedShots,
    currentShipsOBJ,
    placeShipRandomly,
  };
}
