import { getInput } from "../get-input";

const expand = (lines: string[]) => {
  let expanded = [];

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].split("").every((c) => c === ".")) {
      expanded.push(lines[i]);
    }
    expanded.push(lines[i]);
  }

  let inserted = 0;

  for (let i = 0; i < lines[0].length; i++) {
    const column = lines.map((line) => line[i]);
    const isEmpty = column.every((c) => c === ".");

    if (isEmpty) {
      expanded = expanded.map((line) => {
        return line
          .split("")
          .toSpliced(i + inserted, 0, ".")
          .join("");
      });
      inserted++;
    }
  }

  return expanded;
};

const day11 = async () => {
  console.log(await getInput("src/day11/input.txt"));
  const lines = (await getInput("src/day11/input.txt")).split("\n");

  const galaxies: number[][] = [];

  const emptyRows = new Set<number>();
  const emptyCols = new Set<number>();

  for (let i = 0; i < lines.length; i++) {
    emptyRows.add(i);
  }
  for (let i = 0; i < lines[0].length; i++) {
    emptyCols.add(i);
  }

  // Get only the galaxies
  lines.forEach((line, row) =>
    line.split("").forEach((char, col) => {
      if (char === "#") {
        galaxies.push([row, col]);
        emptyRows.delete(row);
        emptyCols.delete(col);
      }
    })
  );

  // Get positions
  const diff = 1;
  const positions = galaxies.map((g) => {
    const newRow = g[0] + diff * [...emptyRows].filter((r) => r < g[0]).length;
    const newCol = g[1] + diff * [...emptyCols].filter((c) => c < g[1]).length;
    return [newRow, newCol];
  });

  let answer = 0;
  for (let i = 0; i < positions.length - 1; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      answer +=
        Math.abs(positions[j][0] - positions[i][0]) +
        Math.abs(positions[j][1] - positions[i][1]);
    }
  }

  return answer;
};

console.log(await day11());
