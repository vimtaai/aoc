const schematic = (await Deno.readTextFile("input.in")).split("\n");
const characters = schematic.map((row) => row.split(""));

function findNeighboringItems(part, items) {
  return items.filter((item) => {
    const rowMatches = item.y >= part.y - 1 && item.y <= part.y + 1;
    const colMatches = item.xStart <= part.xEnd + 1 && item.xEnd >= part.xStart - 1;

    return rowMatches && colMatches;
  });
}

function findItems(row, rowIndex, regex) {
  return [...row.matchAll(regex)].map((match) => ({
    xStart: match.index,
    xEnd: match.index + match[0].length - 1,
    y: rowIndex,
    value: match[0],
  }));
}

const partRegex = /\d+/g;
const symbolRegex = /[^0-9.]/g;

const parts = schematic.flatMap((row, rowIndex) => findItems(row, rowIndex, partRegex));
const symbols = schematic.flatMap((row, rowIndex) => findItems(row, rowIndex, symbolRegex));

const sumOfPartNumbers = parts
  .filter((part) => findNeighboringItems(part, symbols).length > 0)
  .reduce((sum, part) => sum + Number(part.value), 0);

console.log(sumOfPartNumbers);

const sumOfGearRatios = symbols
  .filter((symbol) => symbol.value === "*")
  .map((gear) => findNeighboringItems(gear, parts))
  .filter((neighbors) => neighbors.length === 2)
  .map(([partA, partB]) => partA.value * partB.value)
  .reduce((sum, gearRatio) => sum + gearRatio, 0);

console.log(sumOfGearRatios);
