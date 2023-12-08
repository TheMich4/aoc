import { getInput } from "../get-input";

const strength = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "T",
  "J",
  "Q",
  "K",
  "A",
];

const getValue = (count: Record<string, number>) => {
  const differentCards = Object.values(count).length;

  if (differentCards === 5) return 1;
  if (differentCards === 4) return 2;
  if (Object.values(count).filter((v) => v === 2).length === 2) return 3;
  if (differentCards === 3) return 4;
  if (Object.values(count).filter((v) => v === 2).length === 1) return 5;
  if (differentCards === 2) return 6;
  return 7;
};

const day07 = async () => {
  const lines = (await getInput("src/day07/input.txt")).split("\n");

  let mapped = [];

  for (const line of lines) {
    const [cards, bid] = line.split(/\s+/);

    const count = cards.split("").reduce((acc, card) => {
      acc[card] = acc[card] ? acc[card] + 1 : 1;
      return acc;
    }, {});

    mapped.push({
      cards,
      bid,
      value: getValue(count),
    });
  }

  const ordered = mapped.sort((a, b) => {
    if (a.value > b.value) {
      return 1;
    }

    if (a.value < b.value) {
      return -1;
    }

    for (let i = 0; i < a.cards.length; i++) {
      const aIndex = strength.indexOf(a.cards[i]);
      const bIndex = strength.indexOf(b.cards[i]);

      if (aIndex === bIndex) {
        continue;
      }

      if (aIndex > bIndex) {
        return 1;
      }

      return -1;
    }

    return 0;
  });

  return ordered.reduce((acc, { bid, value, cards }, index) => {
    return (acc += bid * (index + 1));
  }, 0);
};

console.log(await day07());
