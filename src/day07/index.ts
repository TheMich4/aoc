import { getInput } from "../get-input";

const strength = [
  "A",
  "K",
  "Q",
  "J",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
];

const day07 = async () => {
  const lines = (await getInput("src/day07/input.txt")).split("\n");

  let mapped = [];

  for (const line of lines) {
    const [cards, bid] = line.split(/\s+/);
    console.log(cards, bid);

    const count = cards.split("").reduce((acc, card) => {
      acc[card] = acc[card] ? acc[card] + 1 : 1;
      return acc;
    }, {});

    const max = Math.max(...Object.values(count));

    mapped.push({
      cards,
      bid,
      max,
    });

    console.log({ mapped });

    console.log("=====");
  }

  const ordered = mapped.sort((a, b) => {
    if (a.max > b.max) {
      console.log(">", a.max, b.max);
      return 1;
    }

    if (a.max < b.max) {
      console.log("<", a.max, b.max);
      return -1;
    }

    return 0;
  });

  console.log({ ordered });

  return ordered.reduce((acc, { bid, max, cards }, index) => {
    console.log(acc, bid, max, cards, index);
    return (acc += bid * (index + 1));
  }, 0);
};

console.log(await day07());
