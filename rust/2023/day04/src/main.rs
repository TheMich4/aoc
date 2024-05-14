fn main() {
    let contents =
        std::fs::read_to_string("src/input.txt").expect("Something went wrong reading the file");

    println!("Contents:\n{}", contents);
    println!("-----");

    let cards = contents
        .lines()
        .map(|line| {
            let split = line.split(": ").skip(1).collect::<Vec<&str>>()[0]
                .split(" | ")
                .collect::<Vec<&str>>();
            let winning = split[0]
                .split_whitespace()
                .map(|x| x.parse::<i32>().unwrap())
                .collect::<Vec<i32>>();
            let player = split[1]
                .split_whitespace()
                .map(|x| x.parse::<i32>().unwrap())
                .collect::<Vec<i32>>();

            return (winning, player);
        })
        .collect::<Vec<_>>();

    let mut sum = 0;

    cards.iter().for_each(|(winning, player)| {
        let mut score = 0;

        player.iter().for_each(|player_number| {
            if winning.contains(player_number) {
                if score == 0 {
                    score = 1;
                } else {
                    score *= 2;
                }
            }
        });

        sum += score;
    });

    println!("Sum: {}", sum);
}
