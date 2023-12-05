const almanac = (await Deno.readTextFile("input.in")).split("\n");

const seeds = almanac[0].split("seeds: ")[1].split(" ");
const seedRanges = [];

for (let index = 0; index < seeds.length; index += 2) {
  const from = Number(seeds[index]);
  const length = Number(seeds[index + 1]);

  seedRanges.push({ from, length });
}

const instuctionBlocks = almanac.slice(2).join("\n").split("\n\n");
const forwardMap = {};
const backwardMap = {};

for (const instuctionBlock of instuctionBlocks) {
  const rawInstructions = instuctionBlock.split("\n");
  const [typeA, typeB] = rawInstructions[0].split(" map:")[0].split("-to-");
  const instructions = rawInstructions.slice(1).map((row) => {
    const [startA, startB, length] = row.split(" ").map((x) => +x);
    return { startA, startB, length };
  });

  forwardMap[typeA] = {
    to: typeB,
    map: instructions.map(({ startA, startB, length }) => ({
      destinationStart: startA,
      sourceStart: startB,
      length,
    })),
  };

  backwardMap[typeB] = {
    to: typeA,
    map: instructions.map(({ startA, startB, length }) => ({
      destinationStart: startB,
      sourceStart: startA,
      length,
    })),
  };
}

function getValueFromMap(map, value) {
  for (const row of map) {
    if (value >= row.sourceStart && value < row.sourceStart + row.length) {
      return value - row.sourceStart + row.destinationStart;
    }
  }

  return value;
}

function lookupValueInMaps(value, maps, start, end) {
  let currentValue = value;
  let mapType = start;

  while (mapType !== end) {
    currentValue = getValueFromMap(maps[mapType].map, currentValue);
    mapType = maps[mapType].to;
  }

  return currentValue;
}

const seedLocations = seeds.map((seed) => lookupValueInMaps(seed, forwardMap, "seed", "location"));
const minLocationFromLocations = Math.min(...seedLocations);
console.log(minLocationFromLocations);

function seedExistsInRanges(seed, seedRanges) {
  for (const { from, length } of seedRanges) {
    if (seed >= from && seed < from + length) {
      return true;
    }
  }

  return false;
}

function findMinimumLocationWithSeed(backwardInstructions) {
  for (let location = 0; true; location++) {
    const seedForLocation = lookupValueInMaps(location, backwardInstructions, "location", "seed");

    if (seedExistsInRanges(seedForLocation, seedRanges)) {
      return location;
    }
  }
}

let minLocationFromRanges = findMinimumLocationWithSeed(backwardMap);
console.log(minLocationFromRanges);
