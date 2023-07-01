export default function Ship(length) {
  let _hits = 0;
  const _length = length;
  const placed = false;
  let coordinates;

  const hit = () => {
    _hits += 1;
  };

  const isSunk = () => _hits >= _length;

  return { isSunk, hit, _length, placed, coordinates };
}
