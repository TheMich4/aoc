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

const getInput = async () => {
  const inputFile = Bun.file("src/day02/input.txt");
  return await inputFile.text();
};

const getValidGamesSum = async () => {
  const input = await getInput();
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

const getPower = async () => {
  const input = await getInput();
  const record = input.split("\n");

  const gameValues = record.reduce((recordAcc, currRecord) => {
    const [_, games] = currRecord.split(": ");
    const gamesNormalized = games.split("; ").join(", ");

    const gameColors = gamesNormalized.split(", ").reduce((gameAcc, game) => {
      const [valueString, color] = game.split(" ");
      const value = parseInt(valueString, 10);
      const currentColorValue = gameAcc[color] ?? 0;

      return {
        ...gameAcc,
        [color]: currentColorValue > value ? currentColorValue : value,
      };
    }, {});

    return [...recordAcc, gameColors];
  }, []);

  return gameValues.reduce((power, game) => {
    const values = Object.values(game);
    const gamePower = values.reduce((acc, curr) => acc * curr, 1);
    return power + gamePower;
  }, 0);
};

const day02 = async () => {
  //   return await getValidGamesSum();
  return await getPower();
};

console.log(await day02());
