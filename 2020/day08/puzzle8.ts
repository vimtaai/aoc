const input = await Deno.readTextFile("puzzle8.in");

type Instruction = { operation: string; argument: number };
type ExecutionResult = { terminated: boolean; accumulator: number };

function parseInstruction(instruction: string): Instruction {
  const [operation, argument] = instruction.split(" ");
  return { operation, argument: parseInt(argument) };
}

const instructions = input.split("\n").map(parseInstruction);

function swapOperation(instruction: Instruction) {
  if (instruction.operation === "jmp") {
    instruction.operation = "nop";
  } else {
    instruction.operation = "jmp";
  }
}

function executeInstructions(instructions: Instruction[]): ExecutionResult {
  let currentInstruction = 0;
  let accumulator = 0;
  const executedInstructions: number[] = [];

  while (currentInstruction < instructions.length) {
    const { operation, argument } = instructions[currentInstruction];

    if (executedInstructions.includes(currentInstruction)) {
      return { terminated: false, accumulator };
    }

    executedInstructions.push(currentInstruction);
    if (operation === "acc") {
      accumulator += argument;
      currentInstruction += 1;
    } else if (operation === "jmp") {
      currentInstruction += argument;
    } else if (operation === "nop") {
      currentInstruction += 1;
    }
  }

  return { terminated: true, accumulator };
}

function part1() {
  return executeInstructions(instructions).accumulator;
}

function part2() {
  for (const instruction of instructions) {
    const { operation } = instruction;

    if (operation == "acc") {
      continue;
    }

    swapOperation(instruction);
    const result = executeInstructions(instructions);
    if (result.terminated) {
      return result.accumulator;
    }
    swapOperation(instruction);
  }
}

console.log(part1());
console.log(part2());
