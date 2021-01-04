const input: string = await Deno.readTextFile("puzzle10.in");

const adapters = input
  .split("\n")
  .map((line: string) => parseInt(line))
  .sort((a: number, b: number) => a - b);
const deviceJoltage = adapters[adapters.length - 1] + 3;

adapters.push(deviceJoltage);

function part1() {
  const differences = adapters.map((joltage, idx) => joltage - (adapters[idx - 1] || 0));
  const differenceCounts = {
    1: differences.filter((difference) => difference === 1).length,
    3: differences.filter((difference) => difference === 3).length,
  };
  return differenceCounts[1] * differenceCounts[3];
}

function findNextAdapter(currentJoltage: number) {
  return adapters.filter(
    (joltage: number) => joltage > currentJoltage && joltage <= currentJoltage + 3
  );
}

const adapterPermutations = {};
function adapterPermutationCount(currentAdapters: number[], adapterPermutations: number[] = []) {
  const lastAdapter = currentAdapters[currentAdapters.length - 1] || 0;
  if (adapterPermutations[lastAdapter] !== undefined) {
    return adapterPermutations[lastAdapter];
  }

  if (lastAdapter === deviceJoltage) {
    adapterPermutations[lastAdapter] = 1;
    return 1;
  }

  const nextAdapters = findNextAdapter(lastAdapter);

  let count = 0;
  for (const adapter of nextAdapters) {
    count += adapterPermutationCount([...currentAdapters, adapter], adapterPermutations);
  }

  adapterPermutations[lastAdapter] = count;
  return count;
}

function part2() {
  const adapterPermutations = [] as number[];
  return adapterPermutationCount([], adapterPermutations);
}

console.log(part1());
console.log(part2());
