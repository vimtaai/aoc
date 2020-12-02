const input = await Deno.readTextFile("puzzle1.in");
const expenses = input.split("\n").map((line) => parseInt(line));
const targetSum: number = 2020;

function productByIndexes(list: number[], indexes: number[]) {
  return indexes.map((index) => list[index]).reduce((a, b) => a * b);
}

function findMatches(list: number[], indexes: number[], target: number, amount: number): number[] {
  if (amount === 1) {
    const matchIndex = list.findIndex((item, index) => !indexes.includes(index) && item === target);
    return matchIndex === -1 ? [] : [...indexes, matchIndex];
  }

  const matches = list
    .map((item, index) => findMatches(list, [...indexes, index], target - item, amount - 1))
    .find((matches) => matches.length > 0);

  return matches || [];
}

function part1(expenses: number[]) {
  const matches = findMatches(expenses, [], targetSum, 2);

  if (matches.length > 0) {
    console.log(productByIndexes(expenses, matches));
  }
}

function part2(expenses: number[]) {
  const matches = findMatches(expenses, [], targetSum, 3);

  if (matches.length > 0) {
    console.log(productByIndexes(expenses, matches));
  }
}

part1(expenses);
part2(expenses);
