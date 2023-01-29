console.log("test");
console.log("change");

function getBoxDOM(area, x, y) {
  return document.querySelector(
    // .row[data-x="0"] .box[data-y="0"] {
    `.${area} .row[data-x="${x}"] .box[data-y="${y}"]`
  );
}

const test = getBoxDOM("enemyArea", 0, 0);

console.log(test);
