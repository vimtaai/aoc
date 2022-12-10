const instructions = (await Deno.readTextFile("input.in"))
  .split("\n")
  .map((instruction) => instruction.split(" "))
  .flatMap(parseInstruction);

function parseInstruction(instruction) {
  let [command, argument] = instruction;

  if (command === "addx") {
    return [["work"], [command, +argument]];
  }

  return instruction;
}

const CYCLES_TO_MEASURE = [20, 60, 100, 140, 180, 220];
const SCREEN_WIDTH = 40;
const SCREEN_HEIGHT = 6;

let X = 1;
let cycle = 0;
let image = "";
let sumOfSignalStrengths = 0;

while (instructions.length > 0) {
  let screenX = cycle % SCREEN_WIDTH;

  image += Math.abs(screenX - X) <= 1 ? "█" : "░";
  image += screenX === SCREEN_WIDTH - 1 ? "\n" : "";

  cycle += 1;

  if (CYCLES_TO_MEASURE.includes(cycle)) {
    sumOfSignalStrengths += X * cycle;
  }

  let [command, argument] = instructions.shift();

  if (command === "addx") {
    X += argument;
  }
}

console.log(sumOfSignalStrengths);
console.log(image);
