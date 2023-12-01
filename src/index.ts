const parseInput = async () => {
  const inputFile = Bun.file("src/input.txt");
  const input = await inputFile.text();
  return input.split("\n");
};

const numberStringToNumber = new Proxy(
  {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  },
  {
    get: (target, value) => target[value] ?? value,
  }
);

const reverseString = (str?: string) => {
  return str?.split("").reverse().join("");
};

const extractCalibration = (input: Array<string>) => {
  return input.map((str) => {
    const firstNumber = str.match(
      /(\d|one|two|three|four|five|six|seven|eight|nine)/g
    )?.[0];
    const lastNumber = reverseString(
      reverseString(str)?.match(
        /(\d|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin)/i
      )?.[0]
    );

    if (!firstNumber) return 0;

    const stringNumber = [
      numberStringToNumber[firstNumber],
      numberStringToNumber[lastNumber ?? firstNumber],
    ].join("");

    return parseInt(stringNumber, 10);
  });
};

const calibrate = (calibration: Array<number>) => {
  return calibration.reduce((acc, curr) => acc + curr, 0);
};

const main = async () => {
  const input = await parseInput();
  const calibration = extractCalibration(input);
  return calibrate(calibration);
};

console.log(await main());
