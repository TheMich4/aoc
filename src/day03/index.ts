import { getInput } from "../get-input";

const isSymbol = (char: string) => {
  if (char === ".") return false;
  if (!isNaN(+char)) return false;

  return true;
};

const getFullNumber = (line: string, charIndex: number) => {
  let numberString = line[charIndex];
  let left = false;
  let right = false;

  for (const char of line.split("").slice(0, charIndex).reverse()) {
    if (!isNumber(char)) break;
    numberString = `${char}${numberString}`;
    left = true;
  }
  for (const char of line.split("").slice(charIndex + 1)) {
    if (!isNumber(char)) break;
    numberString = `${numberString}${char}`;
    right = true;
  }

  return { number: +numberString, left, right };
};

const isNumber = (char: string) => {
  return !isNaN(+char);
};

const getAdjustedNumbers = (
  lines: string[],
  lineIndex: number,
  charIndex: number
) => {
  const adjustedNumbers = [];

  // Current line
  const line = lines[lineIndex];
  if (isNumber(lines[lineIndex][charIndex - 1])) {
    const { number } = getFullNumber(line, charIndex - 1);
    adjustedNumbers.push(number);
  }
  if (isNumber(lines[lineIndex][charIndex + 1])) {
    const { number } = getFullNumber(line, charIndex + 1);
    adjustedNumbers.push(number);
  }

  // Above line
  if (lineIndex > 0) {
    const aboveLine = lines[lineIndex - 1];
    let left = false,
      right = false;
    if (isNumber(aboveLine[charIndex])) {
      const value = getFullNumber(aboveLine, charIndex);
      adjustedNumbers.push(value.number);

      left = value.left;
      right = value.right;
    }
    if (!left && isNumber(aboveLine[charIndex - 1])) {
      const { number } = getFullNumber(aboveLine, charIndex - 1);
      adjustedNumbers.push(number);
    }
    if (!right && isNumber(aboveLine[charIndex + 1])) {
      const { number } = getFullNumber(aboveLine, charIndex + 1);
      adjustedNumbers.push(number);
    }
  }

  // Below line
  if (lineIndex < lines.length - 1) {
    const belowLine = lines[lineIndex + 1];
    let left = false,
      right = false;
    if (isNumber(belowLine[charIndex])) {
      const value = getFullNumber(belowLine, charIndex);
      adjustedNumbers.push(value.number);

      left = value.left;
      right = value.right;
    }
    if (!left && isNumber(belowLine[charIndex - 1])) {
      const { number } = getFullNumber(belowLine, charIndex - 1);
      adjustedNumbers.push(number);
    }
    if (!right && isNumber(belowLine[charIndex + 1])) {
      const { number } = getFullNumber(belowLine, charIndex + 1);
      adjustedNumbers.push(number);
    }
  }

  return adjustedNumbers;
};

const day03 = async () => {
  const lines = (await getInput("src/day03/input.txt"))
    .split("\n")
    .map((l) => `.${l}.`);

  return lines.reduce((acc, line, lineIndex) => {
    for (const [charIndex, char] of line.split("").entries()) {
      isSymbol(char);

      if (isSymbol(char)) {
        const adjustedNumbers = getAdjustedNumbers(lines, lineIndex, charIndex);
        // Add adjusted numbers to acc
        acc = acc + adjustedNumbers.reduce((acc, curr) => acc + curr, 0);
      }
    }

    return acc;
  }, 0);
};

console.log(await day03());
