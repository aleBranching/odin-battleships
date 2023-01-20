export default function Ship(length) {
  let _hits = 0;
  let _length = length;

  let hit = () => {
    _hits += 1;
  };

  let isSunk = () => {
    return _hits >= _length ? true : false;
  };

  //   this.length = length;

  //   this._sunk = false;
  //   this._hits = 0;

  //   function hit() {
  //     this._hits = +1;
  //     //
  //   }

  //   function isSunk() {
  //     return this._hits >= length ? true : false;
  //     //
  //   }

  return { isSunk, hit };
}
