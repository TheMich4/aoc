import { getInput } from "../get-input";

const moveToIndex = {
  L: 0,
  R: 1,
};

function gcd(a: number, b: number) {
  var t = 0;
  a < b && ((t = b), (b = a), (a = t)); // swap them if a < b
  t = a % b;
  return t ? gcd(b, t) : b;
}

function lcm(a: number, b: number) {
  return (a / gcd(a, b)) * b;
}

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

  let currentLocations = Object.keys(locationToMoves).filter(
    (l) => l[2] === "A"
  );
  let steps = [];

  console.log(currentLocations, steps);

  currentLocations.forEach((location) => {
    let currentLocation = location;
    let currentSteps = 0;
    while (true) {
      for (const move of moves) {
        const moveIndex = moveToIndex[move];
        currentLocation = locationToMoves[currentLocation][moveIndex];
        currentSteps++;
      }
      if (currentLocation[2] === "Z") {
        steps.push(currentSteps);
        break;
      }
    }
  });

  return steps.reduce(lcm);
};

console.log(await day08());
