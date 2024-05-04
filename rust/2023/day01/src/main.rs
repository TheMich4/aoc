use std::fs;

fn main() {
    let contents =
        fs::read_to_string("src/input.txt").expect("Something went wrong reading the file");

    println!("Contents:\n{}", contents);
    println!("-----");

    let numbers: i32 = contents
        .lines()
        .map(|line| {
            let digits = line
                .chars()
                .filter(|c| c.is_numeric())
                .map(|c| c.to_digit(10).unwrap() as i32)
                .collect::<Vec<i32>>();

            let first = digits.first().unwrap();
            let last = digits.last().unwrap();

            return format!("{}{}", first, last).parse::<i32>().unwrap();
        })
        .sum();

    println!("Sum of first and last digits: {}", numbers);
}
