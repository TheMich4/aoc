import { getInput } from "../get-input";

const input = await getInput("src/day02/input.txt");
// const input = await getInput("src/day02/input-example.txt");

console.log(input);

const lines = input.split("\n").filter(Boolean);

const part1 = () => {
  const reports = lines.map((line) => line.split(" ").map(Number));

  const sum = reports.reduce((acc, report) => {
    let increasing = true;
    let decreasing = true;

    for (let i = 0; i < report.length - 1; i++) {
      if (report[i] === report[i + 1]) {
        return acc;
      }

      const diff = Math.abs(report[i] - report[i + 1]);
      if (diff < 1 || diff > 3) {
        return acc;
      }

      if (report[i] < report[i + 1]) {
        decreasing = false;
      } else {
        increasing = false;
      }

      if (!increasing && !decreasing) {
        return acc;
      }
    }

    return acc + 1;
  }, 0);

  console.log(sum);
};

const part2 = () => {};

part1();
part2();
