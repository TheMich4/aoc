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
        process.stdout.write(".");
      } else {
        process.stdout.write(`${distances[i][j].toString()}`);
      }
    }
    process.stdout.write("\n");
  }
};

const dirs = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const checkIsConnectedToEdge = (chars: string[][], position: number[]) => {
  const [x, y] = position;

  if (x === 0 || y === 0 || y === chars.length - 1 || x === chars[y].length - 1)
    return "yes";

  for (const dir of dirs) {
    if (chars[y + dir[1]][x + dir[0]] === "🟥") return "yes";
  }

  for (const dir of dirs) {
    if (chars[y + dir[1]][x + dir[0]] === "🟨") return "wait";
  }

  return "no";
};

const part01 = async () => {
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

const part02 = async () => {
  const lines = (await getInput("src/day10/input.txt")).split("\n");
  const chars = lines.map((line) => line.split(""));
  let newChars = chars.map((line) =>
    line.map((x) => (x === "." ? "🟨" : "🟦"))
  );
  let positionsToCheck = [];

  for (let x = 0; x < newChars.length; x++) {
    for (let y = 0; y < newChars[x].length; y++) {
      if (newChars[x][y] === "🟨") {
        positionsToCheck.push(`${x},${y}`);
      }
    }
  }

  let count = 0;

  do {
    let newPositionsToCheck = [];
    for (const position of [...positionsToCheck]) {
      const [y, x] = position.split(",").map((x) => parseInt(x));
      const currentChar = newChars[y][x];

      // if (currentChar !== "🟨") continue;

      const isConnectedToEdge = checkIsConnectedToEdge(newChars, [x, y]);

      if (isConnectedToEdge === "yes") {
        newChars[y][x] = "🟥";
      }
      if (isConnectedToEdge === "wait") {
        newPositionsToCheck.push(position);
        newChars[y][x] = "🟧";
      }
      if (isConnectedToEdge === "no") {
        newChars[y][x] = "🟩";
        count++;
      }

      console.clear();
      console.log(`x: ${x},\t y: ${y}\t`);
      // printDistances(newChars);

      // await new Promise((resolve) => setTimeout(resolve, 10));
    }
    positionsToCheck = newPositionsToCheck;
  } while (positionsToCheck.length > 0);

  console.log("done");

  return count;
};

const day10 = async () => {
  // return part01();
  return part02();
};

console.log(await day10());
