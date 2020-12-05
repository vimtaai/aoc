import {
  isBirthYearValid,
  isExpirationYearValid,
  isEyeColorValid,
  isHairColorValid,
  isHeightValid,
  isIssueYearValid,
  isPasswordIdValid,
} from "./puzzle4-validators.ts";

const input = await Deno.readTextFile("puzzle4.in");

const fieldValidators: { [name: string]: (value: string) => boolean } = {
  byr: isBirthYearValid,
  iyr: isIssueYearValid,
  eyr: isExpirationYearValid,
  hgt: isHeightValid,
  hcl: isHairColorValid,
  ecl: isEyeColorValid,
  pid: isPasswordIdValid,
};

function parsePassportRecord(passportData: string) {
  return passportData.split(/ |\r?\n/g);
}

function createPassportObject(passportData: string[]) {
  const object: { [name: string]: string } = {};
  for (const row of passportData) {
    const [name, value] = row.split(":");
    object[name] = value;
  }
  return object;
}

function isAllKeysPresent(passport: { [name: string]: string }) {
  return Object.keys(fieldValidators).every((key) => passport.hasOwnProperty(key));
}

function isPasswordValid(passport: { [name: string]: string }) {
  return Object.keys(fieldValidators).every(
    (key) => passport.hasOwnProperty(key) && fieldValidators[key](passport[key])
  );
}

const passports = input
  .split(/\r?\n\r?\n/)
  .map(parsePassportRecord)
  .map(createPassportObject);

console.log(passports.filter(isAllKeysPresent).length);
console.log(passports.filter(isPasswordValid).length);
