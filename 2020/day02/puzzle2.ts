const input = await Deno.readTextFile("puzzle2.in");

class Password {
  private password: string;
  private numberA: number;
  private numberB: number;
  private letter: string;

  constructor(line: string) {
    const [policy, password] = line.split(": ");
    const [numbers, letter] = policy.split(" ");
    const [numberA, numberB] = numbers.split("-");

    this.password = password;
    this.numberA = parseInt(numberA);
    this.numberB = parseInt(numberB);
    this.letter = letter;
  }

  public get isPart1Valid(): boolean {
    const count = Array.from(this.password).filter((letter) => letter === this.letter).length;
    return this.numberA <= count && count <= this.numberB;
  }

  public get isPart2Valid(): boolean {
    const numberAMatches = this.password[this.numberA - 1] === this.letter;
    const numberBMatches = this.password[this.numberB - 1] === this.letter;

    return numberAMatches != numberBMatches;
  }
}

const passwords = input.split("\n").map((line) => new Password(line));

console.log(passwords.filter((password) => password.isPart1Valid).length);
console.log(passwords.filter((password) => password.isPart2Valid).length);
