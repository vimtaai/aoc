const data = (await Deno.readTextFile("input.in"))
  .split("\n")
  .map((row) => row.split(/:\s*/)[1])
  .map((row) => row.split(/\s+/));

const times = data[0];
const distances = data[1];
const races = times.map((time, index) => ({ time, record: distances[index] }));

const timeWithKerning = times.join("");
const distanceWithKerning = distances.join("");
const raceWithKerning = { time: timeWithKerning, record: distanceWithKerning };

function findWinningOptions({ time, record }) {
  const winningOptions = [];

  for (let t = 1; t < time; t++) {
    if (t * (time - t) > record) {
      winningOptions.push(t);
    }
  }

  return winningOptions;
}

const winningOptionCountPerRace = races
  .map(findWinningOptions)
  .map((winningOptions) => winningOptions.length);

const productOfWinningOptionCounts = winningOptionCountPerRace.reduce((sum, value) => sum * value, 1);
console.log(productOfWinningOptionCounts);

const winningOptions = findWinningOptions(raceWithKerning);
console.log(winningOptions.length);
