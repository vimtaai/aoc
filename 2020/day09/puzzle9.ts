const input: string = await Deno.readTextFile("puzzle9.in");
const preambleLength = 25;

const numbers = input.split("\n").map((line: string) => parseInt(line));

const hasMatchingNumber = (numbers: number[], target: number) => (numberA: number) =>
  numbers.some((numberB: number) => numberA + numberB === target);

function isNumberInvalid(x: number, idx: number) {
  const numbersToCheck = numbers.slice(idx, idx + preambleLength);
  return !numbersToCheck.some(hasMatchingNumber(numbersToCheck, x));
}

function part1() {
  return numbers.slice(preambleLength).find(isNumberInvalid);
}

function part2() {
  const invalidNumberIndex = numbers.slice(preambleLength).findIndex(isNumberInvalid);
  const invalidNumber = numbers[invalidNumberIndex + preambleLength];

  for (let i = 0; i < invalidNumberIndex; i++) {
    let sum = 0;
    let smallest = numbers[i];
    let largest = numbers[i];

    for (let j = i + 1; j < invalidNumberIndex && sum < invalidNumber; j++) {
      sum += numbers[j];

      if (numbers[j] > largest) {
        largest = numbers[j];
      }
      if (numbers[j] < smallest) {
        smallest = numbers[j];
      }

      if (sum == invalidNumber) {
        return smallest + largest;
      }
    }
  }
}

console.log(part1());
console.log(part2());
