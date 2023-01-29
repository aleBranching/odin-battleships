export default function enemyPlayer(humanBoard) {
  // min is inclusive max is exclusive

  const movesDone = [];
  const getRandomCoord = () => {
    const x = Math.random() * 9;
    const y = Math.random() * 9;

    return [x, y];
  };

  const attack = () => {
    const [x, y] = getRandomCoord();
    if (movesDone.includes([x, y])) {
      return;
    }
    humanBoard.receiveAttack(x, y);
    movesDone.push([x, y]);
  };

  return { attack, movesDone };
}
