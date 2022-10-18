const fs = require('fs');

const input = fs.readFileSync("puzzle3.in", "utf-8");
const binaryInput = input.split("\n")
  .map((line) => line.split(""))
  .map((line) => line.map((char) => parseInt(char)));

function getBitCounts(binaryInput) {
  return binaryInput.reduce((counts, bits) => {
    bits.forEach((bit, index) => {
      if (!counts[index]) {
        counts[index] = { 0: 0, 1: 0 };
      }

      counts[index][bit]++;
    });

    return counts;
  }, []);
}

function part1(binaryInput) {
  const bitCounts = getBitCounts(binaryInput);

  const gammaRate = bitCounts
    .map(({ 0: zeroBitCount, 1: oneBitCount }) => zeroBitCount > oneBitCount ? 0 : 1)
    .join("");
  const epsilonRate = bitCounts
    .map(({ 0: zeroBitCount, 1: oneBitCount }) => zeroBitCount > oneBitCount ? 1 : 0)
    .join("");

  console.log(gammaRate, epsilonRate);
  console.log(parseInt(gammaRate, 2) * parseInt(epsilonRate, 2));
}

function searchBitCounts(binaryInput, bitIndex, getRequiredValue) {
  const bitCounts = getBitCounts(binaryInput);
  const requiredValue = getRequiredValue(bitCounts[bitIndex][0], bitCounts[bitIndex][1]);

  const filteredBitCounts = binaryInput.filter((bits) => bits[bitIndex] === requiredValue);

  if (filteredBitCounts.length === 1) {
    return filteredBitCounts[0].join("");
  }

  return searchBitCounts(filteredBitCounts, bitIndex + 1, getRequiredValue);
}

function part2(binaryInput) {
  const mostCommonValue = (zeroBitCount, oneBitCount) => zeroBitCount > oneBitCount ? 0 : 1;
  const oxigenGeneratorRating = searchBitCounts(binaryInput, 0, mostCommonValue);
  const leastCommonValue = (zeroBitCount, oneBitCount) => zeroBitCount > oneBitCount ? 1 : 0;
  const co2ScrubberRating = searchBitCounts(binaryInput, 0, leastCommonValue);

  console.log(oxigenGeneratorRating, co2ScrubberRating);
  console.log(parseInt(oxigenGeneratorRating, 2) * parseInt(co2ScrubberRating, 2));
}

part1(binaryInput);
part2(binaryInput);