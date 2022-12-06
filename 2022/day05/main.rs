use std::{collections::VecDeque, io, vec};

#[derive(PartialEq, Eq)]
enum LineType {
    Arrangement,
    Instructions,
}

type Arrangement = Vec<VecDeque<char>>;
type ArrangementDescriptor = Vec<String>;

struct Instruction {
    from: usize,
    to: usize,
    amount: usize,
}

fn parse_arrangement_row(row: &String) -> Vec<(usize, char)> {
    let mut crates: Vec<(usize, char)> = vec![];
    let extended_row = row.clone() + " ";
    let mut remaining_row = extended_row.as_str();
    let mut column: usize = 0;

    while remaining_row.len() >= 3 {
        let (crate_descriptor, remainder) = remaining_row.split_at(3);
        let crate_character = crate_descriptor.chars().nth(1).unwrap();

        if crate_character != ' ' {
            crates.push((column, crate_character));
        }

        column += 1;
        remaining_row = &remainder[1..remainder.len()];
    }

    return crates;
}

fn get_stack_count(arrangement_descriptor: &ArrangementDescriptor) -> usize {
    let last_row = arrangement_descriptor.last().unwrap().trim();
    let column_names: Vec<&str> = last_row.split(' ').collect();

    return column_names.last().unwrap().parse::<usize>().unwrap();
}

fn parse_arrangement(descriptor: &ArrangementDescriptor, number_of_stacks: usize) -> Arrangement {
    let mut arrangement: Arrangement = vec![];

    for _ in 0..number_of_stacks {
        arrangement.push(VecDeque::new());
    }

    for row in descriptor {
        let crates_in_row = parse_arrangement_row(row);

        for (column, crate_character) in crates_in_row {
            arrangement[column].push_back(crate_character);
        }
    }

    return arrangement;
}

fn parse_instruction(line: String) -> Instruction {
    let split: Vec<&str> = line.split(' ').collect();

    let from = split[3].parse::<usize>().unwrap() - 1;
    let to = split[5].parse::<usize>().unwrap() - 1;
    let amount = split[1].parse::<usize>().unwrap();

    return Instruction { from, to, amount };
}

fn print_arrangement(arrangement: &Arrangement) {
    for stack in arrangement {
        for crate_character in stack {
            print!("{} ", crate_character);
        }
        println!();
    }
}

fn print_top_crates_in_arrangement(arrangement: &Arrangement) {
    for stack in arrangement {
        let crate_on_top = stack.front();

        if crate_on_top.is_some() {
            print!("{}", stack.front().unwrap());
        } else {
            print!("?");
        }
    }
    println!();
}

fn main() {
    let mut line_type = LineType::Arrangement;
    let lines = io::stdin().lines();

    let mut descriptor: ArrangementDescriptor = vec![];
    let mut instructions: Vec<Instruction> = vec![];

    for line in lines {
        let line = line.unwrap().clone();

        if line.trim() == "" {
            line_type = LineType::Instructions;
            continue;
        }

        if line_type == LineType::Arrangement {
            descriptor.push(line);
        } else if line_type == LineType::Instructions {
            instructions.push(parse_instruction(line));
        }
    }

    let number_of_stacks = get_stack_count(&descriptor);
    let number_of_rows = descriptor.len() - 1;
    descriptor.remove(number_of_rows);

    let mut first_arrangement = parse_arrangement(&descriptor, number_of_stacks);
    let mut second_arrangement = parse_arrangement(&descriptor, number_of_stacks);

    for instruction in &instructions {
        let mut moved_stack: VecDeque<char> = VecDeque::new();

        for _ in 0..instruction.amount {
            let crate_to_move_first = first_arrangement[instruction.from].pop_front();
            let crate_to_move_second = second_arrangement[instruction.from].pop_front();

            if crate_to_move_first.is_some() {
                first_arrangement[instruction.to].push_front(crate_to_move_first.unwrap());
            }

            if crate_to_move_second.is_some() {
                moved_stack.push_front(crate_to_move_second.unwrap());
            }
        }

        for crate_to_move in moved_stack {
            second_arrangement[instruction.to].push_front(crate_to_move);
        }
    }

    println!("---------------------------");
    print_top_crates_in_arrangement(&first_arrangement);
    print_top_crates_in_arrangement(&second_arrangement);
}
