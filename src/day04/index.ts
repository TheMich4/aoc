import { getInput } from "../get-input";

const day03 = async () => {
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

console.log(await day03());
