const instructions = (await Deno.readTextFile("input.in")).split("\n");

const digitMap = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

function startsWithDigitFromPosition(row, position) {
  const rowFromPosition = row.substr(position);

  for (const digit of Object.keys(digitMap)) {
    if (rowFromPosition.startsWith(digit)) {
      return digit;
    }
  }

  return null;
}

function collectDigits(row) {
  const digits = [];

  for (let position = 0; position < row.length; position++) {
    const isNumberDigit = !Number.isNaN(+row[position]);

    if (isNumberDigit) {
      digits.push(+row[position]);
      continue;
    }

    const stringDigit = startsWithDigitFromPosition(row, position);

    if (stringDigit !== null) {
      digits.push(digitMap[stringDigit]);
    }
  }

  return digits;
}

const numbers = instructions.map((row) => {
  const digits = collectDigits(row);
  const number = `${digits.at(0)}${digits.at(-1)}`;

  return +number;
});

const sum = numbers.reduce((a, b) => a + b, 0);

console.log(sum);
