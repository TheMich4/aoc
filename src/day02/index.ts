const LIMITS = new Proxy(
  {
    red: 12,
    green: 13,
    blue: 14,
  },
  {
    get: (target, value: string) => target[value] ?? 0,
  }
);

const day02 = async () => {
  const inputFile = Bun.file("src/day02/input.txt");
  const input = await inputFile.text();
  const record = input.split("\n");

  return record.reduce((gamesSum, currRecord) => {
    const [gameTitle, games] = currRecord.split(": ");
    const gameNumber = gameTitle.split(" ")[1];
    const gamesNormalized = games.split("; ").join(", ");

    for (const game of gamesNormalized.split(", ")) {
      const [value, color] = game.split(" ");
      const isAboveLimit = parseInt(value, 10) > LIMITS[color];

      if (isAboveLimit) {
        return gamesSum;
      }
    }

    return gamesSum + parseInt(gameNumber, 10);
  }, 0);
};

console.log(await day02());
