import { getInput } from "../get-input";

const day06 = async () => {
  const [time, distance] = (await getInput("src/day06/input.txt")).split("\n");
  const times = time.trim().split(/\s+/).slice(1).map(Number);
  const distances = distance.trim().split(/\s+/).slice(1).map(Number);

  let result = 1;

  for (let i = 0; i < times.length; i++) {
    let winCount = 0;

    const time = times[i];
    const record = distances[i];

    let speed = -1;
    let reachedRecord = false;

    for (let holdTime = 0; holdTime <= time; holdTime++) {
      speed += 1;
      const timeLeft = time - holdTime;
      const distance = speed * timeLeft;

      if (distance > record) {
        reachedRecord = true;
        winCount++;
      }

      if (distance < record && reachedRecord) {
        console.log("->", result, winCount);
        result *= winCount;
        break;
      }
    }
  }

  return result;
};

console.log(await day06());
