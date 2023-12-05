import { getInput } from "../get-input";

const day05 = async () => {
  const lines = (await getInput("src/day05/input.txt")).split("\n");
  const [seedsString, _, ...rest] = lines;

  const seeds = seedsString.split(" ").slice(1).map(Number);
  let seedsMaps = [];

  for (let i = 0; i <= seeds.length / 2; i += 2) {
    seedsMaps.push({
      start: seeds[i],
      size: seeds[i + 1],
    });
  }

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
      },
    ];

    return acc;
  }, [] as Array<Array<Record<string, number>>>);

  // const locations = seeds.map((seed) => {
  //   let index = seed;

  //   for (const valueMap of valueMaps) {
  //     for (const value of valueMap) {
  //       if (index >= value.start && index < value.end) {
  //         index = index - value.start + value.destination;
  //         break;
  //       }
  //     }
  //   }

  //   return index;
  // });

  // return Math.min(...locations);

  let location = undefined;
  let z = -1;

  for (const seedMap of seedsMaps) {
    z++;
    for (let i = 0; i < seedMap.size; i++) {
      let index = seedMap.start + i;

      for (const valueMap of valueMaps) {
        for (const value of valueMap) {
          if (index >= value.start && index < value.end) {
            index = index - value.start + value.destination;
            break;
          }
        }
      }

      if (!location) {
        location = index;
      } else if (index < location) {
        location = index;
      }
    }
  }

  return location;
};

console.log(await day05());
