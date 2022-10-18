const fs = require('fs');

const input = fs.readFileSync("puzzle2.in", "utf-8");
const commandList = input.split("\n")
  .map((line) => line.split(" "))
  .map(([commandWord, amount]) => ({ commandWord, amount: parseInt(amount) }));

const commands = {
  forward: ({ position, depth }, amount) => ({ position: position + amount, depth }),
  down: ({ position, depth }, amount) => ({ position, depth: depth + amount }),
  up: ({ position, depth }, amount) => ({ position, depth: depth - amount })
}

function part1(commandList) {
  const finalPosition = commandList.reduce((currentPosition, { commandWord, amount }) =>
    commands[commandWord](currentPosition, amount), { position: 0, depth: 0 });

  console.log(finalPosition.position * finalPosition.depth);
}

const commandsWithAim = {
  forward: ({ position, depth, aim }, amount) => ({ position: position + amount, depth: depth + amount * aim, aim }),
  down: ({ position, depth, aim }, amount) => ({ position, depth, aim: aim + amount }),
  up: ({ position, depth, aim }, amount) => ({ position, depth, aim: aim - amount })
};

function part2(commandList) {
  const finalPosition = commandList.reduce((currentPosition, { commandWord, amount }) =>
  commandsWithAim[commandWord](currentPosition, amount), { position: 0, depth: 0, aim: 0 });

  console.log(finalPosition.position * finalPosition.depth);
}

part1(commandList);
part2(commandList);