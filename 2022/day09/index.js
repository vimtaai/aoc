const motions = (await Deno.readTextFile("input.in"))
  .split("\n")
  .map((row) => row.split(" "))
  .flatMap(([direction, amount]) => direction.repeat(amount).split(""));

const ROPE_LENGTH = 10;

const motionMap = {
  U: ["y", 1],
  D: ["y", -1],
  R: ["x", 1],
  L: ["x", -1],
};

function moveHead(direction) {
  const [coordinate, amount] = motionMap[direction];

  head[coordinate] += amount;
}

function moveKnot(knotIndex) {
  const knot = rope[knotIndex];
  const previousKnot = rope[knotIndex - 1];

  const dx = Math.abs(previousKnot.x - knot.x);
  const dy = Math.abs(previousKnot.y - knot.y);

  if (dx < 2 && dy < 2) {
    return;
  }

  if (dx != 0) {
    knot.x += knot.x < previousKnot.x ? 1 : -1;
  }

  if (dy != 0) {
    knot.y += knot.y < previousKnot.y ? 1 : -1;
  }
}

let rope = [...Array(ROPE_LENGTH)].map(() => ({ x: 0, y: 0 }));
let head = rope.at(0);
let tail = rope.at(-1);

let tailTrack = new Set();

for (const direction of motions) {
  moveHead(direction);

  for (let i = 1; i < rope.length; i++) {
    moveKnot(i);
  }

  tailTrack.add(`${tail.x};${tail.y}`);
}

console.log(tailTrack.size);
