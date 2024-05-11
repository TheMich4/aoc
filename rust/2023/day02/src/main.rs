use std::{collections::HashMap, fs};

fn main() {
    let contents =
        fs::read_to_string("src/input.txt").expect("Something went wrong reading the file");

    println!("Contents:\n{}", contents);
    println!("-----");

    let rules: HashMap<&str, i32> = HashMap::from([("red", 12), ("green", 13), ("blue", 14)]);

    let games: _ = contents
        .lines()
        .map(|line| {
            line.split(": ")
                .skip(1)
                .next()
                .expect("No game found")
                .split("; ")
                .map(|g| {
                    g.split(", ")
                        .map(|y| {
                            let chunk = y.split(" ").collect::<Vec<_>>();
                            return (chunk[1], chunk[0].parse::<i32>().unwrap());
                        })
                        .collect()
                })
                .collect::<Vec<HashMap<&str, i32>>>()
        })
        .collect::<Vec<_>>();

    println!("rules: {:?}", rules);
    println!("games: {:?}", games);

    println!("-----\n");

    let mut total: i32 = 0;

    games.into_iter().enumerate().for_each(|(i, game)| {
        let mut is_valid = true;

        game.iter().for_each(|g| {
            g.keys().for_each(|a| {
                let rule = rules.get(a).unwrap();
                let value = g.get(a).unwrap();

                if value > rule {
                    is_valid = false;
                }
            });
        });

        if is_valid {
            total += (i as i32) + 1;
        }
    });

    println!("Total: {}", total);
}
