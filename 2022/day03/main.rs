use std::io;

fn get_priority(item: char) -> usize {
    if item.is_lowercase() {
        return item as usize - 'a' as usize + 1;
    } else {
        return item as usize - 'A' as usize + 27;
    }
}

fn find_item_for_rucksack(first_compartment: &String, second_compartment: &String) -> char {
    for item in first_compartment.chars() {
        if second_compartment.find(item) != None {
            return item;
        }
    }

    return '\0';
}

fn find_badge_for_group(group_of_elves: &Vec<String>) -> char {
    let mut lowercase_letters: Vec<char> = ('a'..='z').collect();
    let mut uppercase_letters: Vec<char> = ('A'..='Z').collect();

    let mut all_letters: Vec<char> = vec![];
    all_letters.append(&mut lowercase_letters);
    all_letters.append(&mut uppercase_letters);

    for character in all_letters {
        if group_of_elves[0].find(character) != None
            && group_of_elves[1].find(character) != None
            && group_of_elves[2].find(character) != None
        {
            return character;
        }
    }

    return '\0';
}

fn main() {
    let mut sum_of_priorities: usize = 0;

    let mut sum_of_badge_priorities: usize = 0;
    let mut group_of_elves: Vec<String> = vec![];

    let lines = io::stdin().lines();
    for line in lines {
        let mut line = line.unwrap();

        group_of_elves.push(line.clone());

        let second: String = line.split_off(line.len() / 2);
        let first: String = line.clone();

        let item_in_both_compartments: char = find_item_for_rucksack(&first, &second);

        sum_of_priorities += get_priority(item_in_both_compartments);

        if group_of_elves.len() == 3 {
            let badge: char = find_badge_for_group(&group_of_elves);
            sum_of_badge_priorities += get_priority(badge);
            group_of_elves = vec![];
        }
    }

    println!("{}", sum_of_priorities);
    println!("{}", sum_of_badge_priorities);
}
