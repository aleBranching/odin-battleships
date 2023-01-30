export default function enemyPlayer(humanBoard) {
  // min is inclusive max is exclusive

  const movesDone = [];
  const getRandomCoord = () => {
    const x = Math.random() * 9;
    const y = Math.random() * 9;
    if (movesDone.includes([x, y])) {
      getRandomCoord();
    }
    return [x, y];
  };

  const attack = () => {
    const [x, y] = getRandomCoord();

    const isHit = humanBoard.receiveAttack(x, y);
    movesDone.push([x, y]);
    return [isHit, x, y];
  };

  return { attack, movesDone };
}
