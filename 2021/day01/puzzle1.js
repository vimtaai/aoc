const fs = require('fs');

const input = fs.readFileSync("puzzle1.in", "utf-8");
const depths = input.split("\n").map((line) => parseInt(line));

function part1(depths) {
  const increases = depths.reduce((count, depth, index, array) =>
    count + (array[index] < (array[index + 1] || 0) ? 1 : 0), 0);

  console.log(increases);
}

function part2(depths) {
  const windows = depths.map((depth, index, array) =>
    array[index] + (array[index + 1] || 0) + (array[index + 2] || 0));

  part1(windows);
}

part1(depths);
part2(depths);