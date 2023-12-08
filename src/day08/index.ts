import { getInput } from "../get-input";

const moveToIndex = {
  L: 0,
  R: 1,
};

const day08 = async () => {
  const [moves, _, ...codes] = (await getInput("src/day08/input.txt")).split(
    "\n"
  );

  console.log(moves);

  const locationToMoves = codes.reduce((acc, code) => {
    const [location, destinations] = code.split(" = ");

    return {
      ...acc,
      [location]: destinations.slice(1, -1).split(", "),
    };
  }, {});

  console.log(locationToMoves);

  let location = "AAA";
  let steps = 0;

  while (true) {
    for (const move of moves) {
      console.log(location, move, steps);
      const moveIndex = moveToIndex[move];
      location = locationToMoves[location][moveIndex];
      steps++;
    }
    if (location === "ZZZ") return steps;
  }
};

console.log(await day08());
