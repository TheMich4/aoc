import { getInput } from "../get-input";

const input = await getInput("src/day01/input.txt");
// const input = await getInput("src/day01/input-example.txt");

console.log(input);

const lines = input.split("\n").filter(Boolean);
const { list1, list2 } = lines.reduce(
  (acc, line) => {
    const [a, b] = line.split("   ").map(Number);
    acc.list1.push(a);
    acc.list2.push(b);
    return acc;
  },
  { list1: [], list2: [] },
);

const list1Sorted = [...list1].sort();
const list2Sorted = [...list2].sort();

const sum = list1Sorted.reduce((acc, curr, i) => {
  return acc + Math.abs(curr - list2Sorted[i]);
}, 0);

console.log(sum);
