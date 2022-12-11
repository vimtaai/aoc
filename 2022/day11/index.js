const monkeys = (await Deno.readTextFile("input.in")).split("\n\n").map(parseMonkey);

const ROUNDS_COUNT = 10000;
const RELIEF_DIVISOR = 1;

function parseItems(items) {
  return items
    .split(": ")
    .at(-1)
    .split(", ")
    .map((item) => Number.parseInt(item));
}

function parseOperation(operation) {
  return operation.split(": ").at(-1).split(" = ").at(-1).split(" ");
}

function parseMonkey(monkey) {
  const [name, items, operation, test, onTrue, onFalse] = monkey.split("\n");

  return {
    name: Number.parseInt(name.split(" ").at(-1)),
    items: parseItems(items),
    operation: parseOperation(operation),
    testDivisor: Number.parseInt(test.split(" ").at(-1)),
    onTrue: Number.parseInt(onTrue.split(" ").at(-1)),
    onFalse: Number.parseInt(onFalse.split(" ").at(-1)),
    inspectionCount: 0,
  };
}

function executeOperation(old, operation) {
  const [arg1, operator, arg2] = operation;

  const arg1Value = arg1 === "old" ? old : Number.parseInt(arg1);
  const arg2Value = arg2 === "old" ? old : Number.parseInt(arg2);

  if (operator === "+") {
    return arg1Value + arg2Value;
  }

  if (operator === "*") {
    return arg1Value * arg2Value;
  }

  throw new Error("Invalid operation");
}

const prodOfTestDivisors = monkeys
  .map((monkey) => monkey.testDivisor)
  .reduce((result, current) => result * current, 1);

for (let round = 0; round < ROUNDS_COUNT; round++) {
  for (const monkey of monkeys) {
    while (monkey.items.length > 0) {
      const item = monkey.items.shift();
      const newWorryLevel = Math.floor(executeOperation(item, monkey.operation) / RELIEF_DIVISOR);
      const normalizedNewWorryLevel = newWorryLevel % prodOfTestDivisors;

      if (normalizedNewWorryLevel % monkey.testDivisor === 0) {
        monkeys[monkey.onTrue].items.push(normalizedNewWorryLevel);
      } else {
        monkeys[monkey.onFalse].items.push(normalizedNewWorryLevel);
      }

      monkey.inspectionCount += 1;
    }
  }
}

const result = monkeys
  .map((monkey) => monkey.inspectionCount)
  .sort((a, b) => b - a)
  .slice(0, 2)
  .reduce((result, current) => result * current, 1);

console.log(result);
