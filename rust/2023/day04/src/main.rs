use std::collections::HashMap;

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

    // let mut sum = 0;
    //
    // cards.iter().for_each(|(winning, player)| {
    //     let mut score = 0;
    //
    //     player.iter().for_each(|player_number| {
    //         if winning.contains(player_number) {
    //             if score == 0 {
    //                 score = 1;
    //             } else {
    //                 score *= 2;
    //             }
    //         }
    //     });
    //
    //     sum += score;
    // });
    //
    // println!("Sum: {}", sum);

    let mut wins: HashMap<i32, i32> = HashMap::new();
    let mut copies: Vec<i32> = vec![];

    cards.iter().enumerate().for_each(|(i, (winning, player))| {
        let won = player.iter().filter(|x| winning.contains(x)).count();

        wins.insert(i as i32, won as i32);
        copies.push(1 as i32);
    });

    for i in 0..cards.len() {
        let win_count = wins.get(&(i as i32)).unwrap();

        for j in (i + 1)..((i + 1) + (*win_count as usize)) {
            copies[j] += copies[i];
        }
    }

    let sum = copies.iter().sum::<i32>();

    println!("Sum: {:?}", sum);
}
