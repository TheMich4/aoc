import { getInput } from "../get-input";

const day05 = async () => {
  const lines = (await getInput("src/day05/input.txt")).split("\n");
  const [seedsString, _, ...rest] = lines;

  const seeds = seedsString.split(" ").slice(1).map(Number);

  let i = 0;
  const valueMaps = rest.reduce((acc, line, x) => {
    if (line === "") {
      i++;
      return acc;
    }
    if (line.includes(":")) {
      acc.push([]);
      return acc;
    }

    const [destinationStart, sourceStart, length] = line.split(" ");

    acc[i] = [
      ...acc[i],
      {
        destination: +destinationStart,
        start: +sourceStart,
        end: +sourceStart + +length,
        size: +length,
      },
    ];

    return acc;
  }, [] as Array<Array<Record<string, number>>>);

  const locations = seeds.map((seed) => {
    let index = seed;

    for (const valueMap of valueMaps) {
      for (const value of valueMap) {
        if (index >= value.start && index < value.end) {
          index = index - value.start + value.destination;
          break;
        }
      }
    }

    return index;
  });

  return Math.min(...locations);
};

console.log(await day05());
