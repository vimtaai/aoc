use std::io;

fn print_marker(marker: &Vec<char>) {
    for character in marker {
        print!("{}", character);
    }

    println!();
}

fn main() {
    let mut signal: String = String::new();
    let result = io::stdin().read_line(&mut signal);

    if !result.is_ok() {
        return;
    }

    let characters = signal.as_str().chars();
    let mut current_marker: Vec<char> = vec![];
    let mut position = 0;

    for character in characters {
        position += 1;
        let character_index = current_marker.iter().position(|&c| c == character);

        if character_index.is_some() {
            let index = character_index.unwrap() + 1;
            current_marker.drain(0..index);
        }

        current_marker.push(character);

        if current_marker.len() == 14 {
            print_marker(&current_marker);
            println!("{}", position);
            break;
        }
    }
}
