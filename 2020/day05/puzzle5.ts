const input = await Deno.readTextFile("puzzle5.in");
const codes = input.split("\n");

const rowCount = 128;
const colCount = 8;

type Seat = {
  row: number;
  col: number;
};

function partitionFind(code: string, maxValue: number, lowChar: string, highChar: string) {
  let low = 0;
  let high = maxValue - 1;

  for (let letter of code) {
    if (letter === lowChar) {
      low += (high - low + 1) / 2;
    }

    if (letter === highChar) {
      high -= (high - low + 1) / 2;
    }
  }

  return high;
}

function splitCode(code: string) {
  return [code.slice(0, 7), code.slice(7)];
}

function parseCode([rowCode, colCode]: string[]): Seat {
  return {
    row: partitionFind(rowCode, rowCount, "B", "F"),
    col: partitionFind(colCode, colCount, "R", "L"),
  };
}

function getSeatId({ row, col }: Seat) {
  return row * 8 + col;
}

const seats = codes.map(splitCode).map(parseCode);
const seatIds = seats.map(getSeatId);
const maxId = Math.max(...seatIds);

console.log(maxId);

const mySeatId = Array.from({ length: maxId }, (x, i) => i)
  .reverse()
  .find((seatId) => !seatIds.includes(seatId as number));

console.log(mySeatId);
