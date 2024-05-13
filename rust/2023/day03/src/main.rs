use std::{
    cmp::{max, min},
    fs,
};

fn main() {
    let contents =
        fs::read_to_string("src/input.txt").expect("Something went wrong reading the file");

    println!("Contents:\n{}", contents);
    println!("-----");

    let mut sum = 0;

    for (line_number, line) in contents.lines().enumerate() {
        // Addes a dot at the end of the line to make parsing easier
        // Probably not the best way to do it, but it works
        let line_content = line.to_string() + ".";

        let mut start = 0;
        let mut number = 0;
        let mut is_parsing = false;

        for (char_index, char) in line_content.chars().enumerate() {
            let parsed_char = char.to_string().parse::<i32>();
            if parsed_char.is_ok() {
                let current_number = parsed_char.unwrap();

                if is_parsing {
                    number = number * 10 + current_number;
                } else {
                    start = char_index;
                    number = current_number;
                    is_parsing = true;
                }
            } else {
                if is_parsing {
                    is_parsing = false;

                    let x_start = max(0, start as i32 - 1);
                    let x_end = min(line_content.len() as i32, char_index as i32);
                    let y_start = max(0, line_number as i32 - 1);
                    let y_end = min(contents.len() as i32, line_number as i32 + 1);

                    for y in y_start..(y_end + 1) {
                        let mut found = false;

                        for x in x_start..(x_end + 1) {
                            let sign = contents
                                .lines()
                                .nth(y as usize)
                                .unwrap_or(".")
                                .chars()
                                .nth(x as usize);

                            if sign.is_some() {
                                let sign_unwrapped = sign.unwrap();

                                if !sign_unwrapped.is_numeric() && sign_unwrapped != '.' {
                                    sum += number;
                                    found = true;
                                    break;
                                }
                            }
                        }

                        if found {
                            break;
                        }
                    }
                }
            }
        }
    }

    println!("Sum: {}", sum);
}
