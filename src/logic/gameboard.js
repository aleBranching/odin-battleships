import Ship from "./ship";

export default function Gameboard() {
  // each number corresponds to index of currentShipsOBJ
  let gameArena = [
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

  let currentShipsOBJ = [
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
  let _placedShips = [];

  let shipNumberRulesPassed = (length) => {
    let _allowedOccurances = {
      1: 4,
      2: 3,
      3: 2,
      4: 1,
    };

    let _occurances = (target) => {
      let counter = 0;
      for (ship of _placedShips) {
        if (ship == target) {
          counter++;
        }
      }
    };

    if (
      _placedShips.includes(length) &&
      _placedShips._occurances(length) < _allowedOccurances[length]
    ) {
      return true;
    } else {
      return false;
    }
  };

  let placeShip = (length, x, y, horizontally) => {
    // test validity of co-ord or amount of ships
    if (x < 0 || y < 0 || x > 10 || y > 10 || !shipNumberRulesPassed(length)) {
      throw new Error((e) => {
        console.error(
          "can't place ship here or no more of these ships or ship too big"
        );
      });
    }

    let checkCoord = (x, y, length, horizontally) => {
      // what would they be naively
      let naiveCoor = (() => {
        let result = [];

        if (horizontally) {
          let newY = y;
          for (let i = 0; i < length; i++) {
            result.push([x, newY]);
            newY++;
            if (newX >= 10) {
              throw new Error("boat out of game!");
            }
          }
        } else if (!horizontally) {
          let newX = x;
          for (let i = 0; i < length; i++) {
            result.push([newX, y]);
            newX++;
            if (newX >= 10) {
              throw new Error("Boat out of game!");
            }
          }
        }

        return result;
      })();

      let checkSurrounding = (naiveCoor, horizontally) => {
        naiveCoor.forEach((element) => {
          let x = element[0];
          let y = element[1];

          let gameArenaCode = gameArena[x][y];

          if (gameArena != 0) {
            // throw new Error("Already has a ship");
            return false;
          }
        });

        if (horizontally) {
          // check below it
          let x = naiveCoor[0][0];

          let xAbove = x + 1;
          if (x != 0 || x != 10) {
            for (let i = 0; i < length; i++) {
              let areaCode = gameArena[xAbove][y + 1];

              if (xAbove >= 10) {
                // throw new Error("Boat out of game!");
                return false;
              }
              //   if(areaCode != 0 && ())
            }
          }

          // check below it
        }
      };
    };
  };
}
