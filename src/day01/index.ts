const parseInput = async () => {
  const inputFile = Bun.file("src/day01/input.txt");
  const input = await inputFile.text();
  return input.split("\n");
};

export const extractCalibration = (input: Array<string>) => {
  return input.map((str) => {
    const numbers = str.match(/(\d)/g);
    if (!numbers) {
      return 0;
    }
    const stringNumber = [numbers[0], numbers[numbers.length - 1]].join("");

    return parseInt(stringNumber, 10);
  });
};

export const calibrate = (calibration: Array<number>) => {
  console.log({ calibration });
  return calibration.reduce((acc, curr) => acc + curr, 0);
};

export const part1 = async () => {
  const input = await parseInput();
  const calibration = extractCalibration(input);
  return calibrate(calibration);
};

export const day01 = async () => {
  part1();
};
