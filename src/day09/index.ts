import { getInput } from "../get-input";

const day09 = async () => {
  const lines = (await getInput("src/day09/input.txt")).split("\n");

  return lines.reduce((acc, line) => {
    const numbers = line.split(" ").map(Number);

    let deltas: number[][] = [numbers];
    let row = 0;

    do {
      let newDeltas = [];
      const current = deltas[row];
      for (let i = 0; i < current.length - 1; i++) {
        newDeltas.push(current[i + 1] - current[i]);
      }
      deltas.push(newDeltas);
      row++;
    } while (!deltas[row].every((d) => d === deltas[row][0]));

    return (acc += deltas.reduce((newNumber, row) => {
      return newNumber + row[row.length - 1];
    }, 0));
  }, 0);
};

console.log(await day09());
