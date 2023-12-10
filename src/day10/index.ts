import { getInput } from "../get-input";

const getValidDirectionPositions = (
  chars: string[][],
  position: number[],
  distances: Array<Array<number | undefined>>
) => {
  const [x, y] = position;
  let validPositions = [];

  // Check top
  if (x > 0) {
    const topChar = chars[x - 1][y];
    if (
      !distances[x - 1][y] &&
      (topChar === "|" || topChar === "7" || topChar === "F")
    ) {
      validPositions.push([x - 1, y]);
    }
  }
  // Check right
  if (y < chars[x].length - 1) {
    const rightChar = chars[x][y + 1];
    if (
      !distances[x][y + 1] &&
      (rightChar === "-" || rightChar === "7" || rightChar === "J")
    ) {
      validPositions.push([x, y + 1]);
    }
  }

  // Check bottom
  if (x < chars.length - 1) {
    const bottomChar = chars[x + 1][y];
    if (
      !distances[x + 1][y] &&
      (bottomChar === "|" || bottomChar === "J" || bottomChar === "L")
    ) {
      validPositions.push([x + 1, y]);
    }
  }

  // Check left
  if (y > 0) {
    const leftChar = chars[x][y - 1];
    if (
      !distances[x][y - 1] &&
      (leftChar === "-" || leftChar === "L" || leftChar === "F")
    ) {
      validPositions.push([x, y - 1]);
    }
  }

  return validPositions;
};

const printDistances = (distances: Array<Array<number | undefined>>) => {
  for (let i = 0; i < distances.length; i++) {
    for (let j = 0; j < distances[i].length; j++) {
      if (distances[i][j] === undefined) {
        process.stdout.write(".\t");
      } else {
        process.stdout.write(`${distances[i][j].toString()}\t`);
      }
    }
    process.stdout.write("\n");
  }
};

const day10 = async () => {
  const lines = (await getInput("src/day10/input.txt")).split("\n");
  const chars = lines.map((line) => line.split(""));

  const distances = new Array(chars.length)
    .fill(undefined)
    .map(() => new Array(chars[0].length).fill(undefined));
  let currentPositions = [];

  for (let i = 0; i < chars.length; i++) {
    for (let j = 0; j < chars[i].length; j++) {
      if (chars[i][j] === "S") {
        currentPositions = [[i, j]];
        distances[i][j] = 0;
        break;
      }
      if (currentPositions.length === 1) break;
    }
  }

  let step = 1;

  do {
    let newPositions = [];
    for (let position of currentPositions) {
      newPositions = [
        ...newPositions,
        ...getValidDirectionPositions(chars, position as number[], distances),
      ];
    }

    newPositions.forEach((position) => {
      const [x, y] = position;
      distances[x][y] = step;
    });

    currentPositions = newPositions;
    step++;
  } while (currentPositions.length > 0);

  printDistances(distances);

  return step - 2;
};

console.log(await day10());
