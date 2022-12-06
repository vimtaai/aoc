use std::io;
use std::ops::Range;

type Assignment = Range<usize>;

fn get_range_from_assignment(assignment: &str) -> Assignment {
    let split: Vec<&str> = assignment.split('-').collect();

    let start = split[0].parse::<usize>().unwrap();
    let end = split[1].parse::<usize>().unwrap();

    return start..end;
}

fn get_assigments_from_line(line: &str) -> (Assignment, Assignment) {
    let split: Vec<&str> = line.split(',').collect();

    let first = get_range_from_assignment(split[0]);
    let second = get_range_from_assignment(split[1]);

    return (first, second);
}

fn range_contains<T: Ord>(first: &Range<T>, second: &Range<T>) -> bool {
    return first.start <= second.start && first.end >= second.end;
}

fn range_overlaps<T: Ord>(first: &Range<T>, second: &Range<T>) -> bool {
    return first.start <= second.start && first.end >= second.start
        || second.start <= first.start && second.end >= first.start;
}

fn main() {
    let mut count_of_containing_assignments = 0;
    let mut count_of_overlapping_assignments = 0;

    let lines = io::stdin().lines();
    for line in lines {
        let line = line.unwrap();
        let (first, second) = get_assigments_from_line(line.as_str());

        if range_contains(&first, &second) || range_contains(&second, &first) {
            count_of_containing_assignments += 1;
        }

        if range_overlaps(&first, &second) || range_overlaps(&second, &first) {
            count_of_overlapping_assignments += 1;
        }
    }

    println!("{}", count_of_containing_assignments);
    println!("{}", count_of_overlapping_assignments);
}
