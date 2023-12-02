function parseDraw(draw) {
  const [number, color] = draw.split(" ");
  return { number, color };
}

const games = (await Deno.readTextFile("input.in"))
  .split("\n")
  .map((row) => row.split(": ")[1])
  .map((row) => row.split("; ").map((draw) => draw.split(", ").map(parseDraw)));

function findMaxPerColor(game, index) {
  const maxColors = {};

  for (const draw of game) {
    for (const { number, color } of draw) {
      maxColors[color] = Math.max(maxColors[color] || 0, number);
    }
  }

  return { id: index + 1, maxColors };
}

const maxColorsPerGame = games.map(findMaxPerColor);
const availableColors = { red: 12, green: 13, blue: 14 };

function hasEnoughOfAllColors(maxColors, availableColors) {
  return Object.entries(availableColors).every(([color, number]) => maxColors[color] <= number);
}

const possibleGames = maxColorsPerGame.filter(({ maxColors }) =>
  hasEnoughOfAllColors(maxColors, availableColors)
);

const sumOfPossibleGameIds = possibleGames.map(({ id }) => id).reduce((a, b) => a + b, 0);
console.log(sumOfPossibleGameIds);

function getPowerOfColors({ red, green, blue }) {
  return red * green * blue;
}

const powerOfMinColorsPerGame = maxColorsPerGame.map(({ maxColors }) =>
  getPowerOfColors(maxColors)
);

const sumOfPowers = powerOfMinColorsPerGame.reduce((a, b) => a + b, 0);
console.log(sumOfPowers);

