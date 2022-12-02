use std::io;

#[derive(Clone, Copy, PartialEq, Eq)]
enum Symbol {
    Rock,
    Paper,
    Scissors,
    Unknown,
}

#[derive(Clone, Copy, PartialEq, Eq)]
enum Result {
    Lose,
    Draw,
    Win,
    Unknown,
}

fn get_symbol(input: &str) -> Symbol {
    return match input {
        "X" | "A" => Symbol::Rock,
        "Y" | "B" => Symbol::Paper,
        "Z" | "C" => Symbol::Scissors,
        _ => Symbol::Unknown,
    };
}

fn get_round_result(input: &str) -> Result {
    return match input {
        "X" => Result::Lose,
        "Y" => Result::Draw,
        "Z" => Result::Win,
        _ => Result::Unknown,
    };
}

fn get_symbol_for_result(opponent_symbol: Symbol, expected_result: Result) -> Symbol {
    let pair: (Symbol, Result) = (opponent_symbol, expected_result);

    return match pair {
        (Symbol::Rock, Result::Win) => Symbol::Paper,
        (Symbol::Rock, Result::Draw) => Symbol::Rock,
        (Symbol::Rock, Result::Lose) => Symbol::Scissors,
        (Symbol::Paper, Result::Win) => Symbol::Scissors,
        (Symbol::Paper, Result::Draw) => Symbol::Paper,
        (Symbol::Paper, Result::Lose) => Symbol::Rock,
        (Symbol::Scissors, Result::Win) => Symbol::Rock,
        (Symbol::Scissors, Result::Draw) => Symbol::Scissors,
        (Symbol::Scissors, Result::Lose) => Symbol::Paper,
        _ => Symbol::Unknown,
    };
}

fn is_round_won(opponent_symbol: Symbol, my_symbol: Symbol) -> bool {
    let pair: (Symbol, Symbol) = (opponent_symbol, my_symbol);

    return match pair {
        (Symbol::Rock, Symbol::Paper) => true,
        (Symbol::Paper, Symbol::Scissors) => true,
        (Symbol::Scissors, Symbol::Rock) => true,
        _ => false,
    };
}

fn is_round_draw(opponent_symbol: Symbol, my_symbol: Symbol) -> bool {
    return opponent_symbol == my_symbol;
}

fn get_round_score(opponent_symbol: Symbol, my_symbol: Symbol) -> usize {
    let my_symbol_value: usize = get_symbol_value(my_symbol);

    if is_round_draw(opponent_symbol, my_symbol) {
        return 3 + my_symbol_value;
    }

    if is_round_won(opponent_symbol, my_symbol) {
        return 6 + my_symbol_value;
    }

    return my_symbol_value;
}

fn get_symbol_value(symbol: Symbol) -> usize {
    return match symbol {
        Symbol::Rock => 1,
        Symbol::Paper => 2,
        Symbol::Scissors => 3,
        Symbol::Unknown => 0,
    };
}

fn main() {
    let mut my_score_part1: usize = 0;
    let mut my_score_part2: usize = 0;

    let lines = io::stdin().lines();
    for line in lines {
        let line = line.unwrap();
        let split_line: Vec<&str> = line.split(' ').collect();

        let opponent_symbol: Symbol = get_symbol(split_line[0]);
        let my_symbol: Symbol = get_symbol(split_line[1]);
        let expected_result: Result = get_round_result(split_line[1]);

        let symbol_for_result = get_symbol_for_result(opponent_symbol, expected_result);
        let round_score_part1 = get_round_score(opponent_symbol, my_symbol);
        let round_score_part2 = get_round_score(opponent_symbol, symbol_for_result);

        my_score_part1 += round_score_part1;
        my_score_part2 += round_score_part2;
    }

    println!("{}", my_score_part1);
    println!("{}", my_score_part2);
}
