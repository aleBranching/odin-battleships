export default function enemyPlayer(humanBoard) {
  // min is inclusive max is exclusive

  const movesDone = [];
  console.log(movesDone);
  const getRandomCoord = () => {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    const foundElement = movesDone.find(
      (element) => element[0] === x && element[1] === y
    );

    if (foundElement !== undefined) {
      return getRandomCoord();
    }
    return [x, y];
  };

  const attack = () => {
    const [x, y] = getRandomCoord();
    console.log("random coord", x, y);

    const isHit = humanBoard.receiveAttack(x, y);
    movesDone.push([x, y]);
    return [isHit, x, y];
  };

  return { attack };
}
