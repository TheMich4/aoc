import { getInput } from "../get-input";

const isSymbol = (char: string) => {
  if (char === ".") return false;
  if (!isNaN(+char)) return false;

  return true;
};

const checkAdjusted = (
  lines: string[],
  lineIndex: number,
  charIndex: number
) => {
  let lineAbove = false;
  let lineBelow = false;
  let lineCurrent = false;

  if (lineIndex !== 0) {
    lineAbove =
      isSymbol(lines[lineIndex - 1][charIndex - 1]) ||
      isSymbol(lines[lineIndex - 1][charIndex]) ||
      isSymbol(lines[lineIndex - 1][charIndex + 1]);
  }
  if (lineIndex !== lines.length - 1) {
    lineBelow =
      isSymbol(lines[lineIndex + 1][charIndex - 1]) ||
      isSymbol(lines[lineIndex + 1][charIndex]) ||
      isSymbol(lines[lineIndex + 1][charIndex + 1]);
  }

  lineCurrent =
    isSymbol(lines[lineIndex][charIndex - 1]) ||
    isSymbol(lines[lineIndex][charIndex + 1]);

  return lineAbove || lineBelow || lineCurrent;
};

const day03 = async () => {
  const lines = (await getInput("src/day03/input.txt"))
    .split("\n")
    .map((l) => `$.${l}.`);

  return lines.reduce((acc, line, lineIndex) => {
    let parsingNumber = undefined;
    let isAdjusted = false;

    for (const [charIndex, char] of line.split("").entries()) {
      if (isNaN(+char)) {
        if (parsingNumber && isAdjusted) {
          console.log("parsingNumber", parsingNumber);
          acc += +parsingNumber;
          isAdjusted = false;
        }

        parsingNumber = undefined;
        continue;
      }

      if (parsingNumber === undefined) {
        parsingNumber = char;
      } else {
        parsingNumber += char;
      }

      isAdjusted = isAdjusted || checkAdjusted(lines, lineIndex, charIndex);

      console.log(char, parsingNumber, charIndex, lineIndex, isAdjusted);

      if (charIndex === line.length - 1) {
        parsingNumber = undefined;
      }
    }

    return acc;
  }, 0);
};

console.log(await day03());
