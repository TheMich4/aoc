import { getInput } from "../get-input";

const day06 = async () => {
  const [timeInput, distance] = (await getInput("src/day06/input.txt")).split(
    "\n"
  );
  const time = +timeInput.trim().split(/\s+/).slice(1).join("");
  const record = +distance.trim().split(/\s+/).slice(1).join("");

  let winCount = 0;
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
      return winCount;
    }
  }
};

console.log(await day06());
