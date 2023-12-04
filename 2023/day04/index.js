const cards = (await Deno.readTextFile("input.in"))
  .split("\n")
  .map((row) => row.split(": ")[1])
  .map((row) => row.split(" | "))
  .map(([winningNumbers, yourNumbers]) => ({
    winningNumbers: winningNumbers.trim().split(/\s+/),
    yourNumbers: yourNumbers.trim().split(/\s+/),
  }));

const yourWinningNumbersPerCard = cards.map(({ winningNumbers, yourNumbers }) =>
  winningNumbers.filter((number) => yourNumbers.includes(number))
);

const pointsPerCard = yourWinningNumbersPerCard.map((yourWinningNumbers) => {
  if (yourWinningNumbers.length === 0) {
    return 0;
  }

  return Math.pow(2, yourWinningNumbers.length - 1);
});

const totalPoints = pointsPerCard.reduce((sum, points) => sum + points, 0);
console.log(totalPoints);

const cardCounts = yourWinningNumbersPerCard.map((yourWinningNumbers) => ({
  winnerCount: yourWinningNumbers.length,
  count: 1,
}));

for (let index = 0; index < cardCounts.length; index++) {
  const { count: countOfCard, winnerCount } = cardCounts[index];

  for (let count = 1; count <= winnerCount; count++) {
    if (cardCounts[index + count] === undefined) {
      break;
    }

    cardCounts[index + count].count += countOfCard;
  }
}

const totalCountOfCards = cardCounts.reduce((sum, card) => sum + card.count, 0);
console.log(totalCountOfCards);
