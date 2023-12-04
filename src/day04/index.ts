import { getInput } from "../get-input";

const part01 = async () => {
  const lines = (await getInput("src/day04/input.txt")).split("\n");

  return lines.reduce((result, line) => {
    const [_, numbers] = line.split(": ");
    const [winningNumbers, yourNumbers] = numbers
      .split(" | ")
      .map((n) => n.split(" ").filter(Boolean));
    const winners = winningNumbers.filter((n) => yourNumbers.includes(n));

    if (winners.length === 0) return result;

    return result + 2 ** (winners.length - 1);
  }, 0);
};

const part02 = async () => {
  const lines = (await getInput("src/day04/input.txt")).split("\n");
  const scratchcards = new Array(lines.length).fill(1);

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    for (let i = 0; i < scratchcards[lineIndex]; i++) {
      const line = lines[lineIndex];
      const [_, numbers] = line.split(": ");
      const [winningNumbers, yourNumbers] = numbers
        .split(" | ")
        .map((n) => n.split(" ").filter(Boolean));
      const winners = winningNumbers.filter((n) => yourNumbers.includes(n));

      if (winners.length === 0) {
        continue;
      }

      for (let j = lineIndex; j < lineIndex + winners.length; j++) {
        scratchcards[j + 1] += 1;
      }
    }
  }

  return scratchcards.reduce((result, scratchcard) => result + scratchcard, 0);
};

const day04 = async () => {
  // return await part01();
  return await part02();
};

console.log(await day04());
