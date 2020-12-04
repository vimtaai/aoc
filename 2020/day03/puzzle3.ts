const input = await Deno.readTextFile("puzzle3.in");
const rows = input.split("\n");

const slopes = [
  { right: 1, down: 1 },
  { right: 3, down: 1 },
  { right: 5, down: 1 },
  { right: 7, down: 1 },
  { right: 1, down: 2 },
];

const isRowOk = (rowIndex: number, down: number) => rowIndex % down === 0;

const getColumnIndex = (rowIndex: number, right: number, rowLength: number) =>
  (rowIndex * right) % rowLength;

const getChar = (row: string, rowIndex: number, right: number) =>
  row[getColumnIndex(rowIndex, right, row.length)];

const isObstacle = (row: string, rowIndex: number, right: number) =>
  getChar(row, rowIndex, right) === "#";

const trees = slopes.map(
  ({ right, down }) =>
    rows
      .filter((row, rowIndex) => isRowOk(rowIndex, down))
      .filter((row, rowIndex) => isObstacle(row, rowIndex, right)).length
);

const product = trees.reduce((p, trees) => p * trees, 1);

console.log(rows.length);
console.log(product);
