fn main() {
    let contents =
        std::fs::read_to_string("src/input.txt").expect("Something went wrong reading the file");

    println!("Contents:\n{}", contents);
    println!("-----");

    let parsed = contents
        .lines()
        .map(|line| return line.split_whitespace().skip(1).collect::<Vec<_>>())
        .collect::<Vec<_>>();

    println!("{:?}", parsed);

    let times = parsed[0]
        .iter()
        .map(|x| x.parse::<i32>().unwrap())
        .collect::<Vec<_>>();
    let records = parsed[1]
        .iter()
        .map(|x| x.parse::<i32>().unwrap())
        .collect::<Vec<_>>();

    println!("{:?}", times);
    println!("{:?}", records);

    let mut result = 1;

    for (i, time) in times.iter().enumerate() {
        let record = records[i];
        let mut win_count = 0;
        let mut speed = -1;
        let mut won = false;

        for hold_time in 0..*time {
            speed += 1;
            let time_left = time - hold_time;
            let distance = speed * time_left;

            if distance > record {
                won = true;
                win_count += 1;
            }

            if (distance < record) && won {
                result *= win_count;
                break;
            }
        }
    }

    println!("{}", result);
}
