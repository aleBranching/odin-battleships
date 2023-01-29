export default function Player(enemyGameArea) {
  // attack enemy board
  const attackEnemy = (x, y) => {
    enemyGameArea.receiveAttack(x, y);
  };

  return { attackEnemy };
}
