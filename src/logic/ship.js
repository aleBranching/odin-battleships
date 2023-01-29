export default function Ship(length) {
  let _hits = 0;
  const _length = length;
  const placed = false;

  const hit = () => {
    _hits += 1;
  };

  const isSunk = () => _hits >= _length;

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

  return { isSunk, hit, _length, placed };
}
