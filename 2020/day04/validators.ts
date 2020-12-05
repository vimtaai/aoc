function isYearValid(value: number, minYear: number, maxYear: number) {
  return minYear <= value && value <= maxYear;
}

export function isBirthYearValid(value: string) {
  return isYearValid(parseFloat(value), 1920, 2002);
}

export function isIssueYearValid(value: string) {
  return isYearValid(parseFloat(value), 2010, 2020);
}

export function isExpirationYearValid(value: string) {
  return isYearValid(parseFloat(value), 2020, 2030);
}

export function isHeightValid(value: string) {
  const unit = value.slice(-2);
  if (unit !== "cm" && unit !== "in") {
    return false;
  }

  const numberValue = parseFloat(value.slice(0, -2));
  if (numberValue === NaN) {
    return false;
  }

  return (
    (unit === "cm" && 150 <= numberValue && numberValue <= 193) ||
    (unit === "in" && 59 <= numberValue && numberValue <= 76)
  );
}

export function isHairColorValid(value: string) {
  return Boolean(value.match(/^#[0-9a-f]{6}$/));
}

export function isEyeColorValid(value: string) {
  const validEyeColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
  return validEyeColors.includes(value);
}

export function isPasswordIdValid(value: string) {
  return Boolean(value.match(/^[0-9]{9}$/));
}
