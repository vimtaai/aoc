use std::io;
use std::vec;

struct ElfInventory {
    calories: Vec<usize>,
    total_calories: usize,
}

fn main() {
    let mut inventories: Vec<ElfInventory> = vec![];
    let mut current_inventory: ElfInventory = ElfInventory {
        calories: vec![],
        total_calories: 0,
    };

    let lines = io::stdin().lines();
    for line in lines {
        let line = line.unwrap();

        if line.trim() == "" {
            inventories.push(current_inventory);
            current_inventory = ElfInventory {
                calories: vec![],
                total_calories: 0,
            };
            continue;
        }

        let calories: usize = line.trim().parse().expect("Input is not a number");

        current_inventory.calories.push(calories);
        current_inventory.total_calories += calories;
    }

    inventories.sort_by(|a, b| b.total_calories.cmp(&a.total_calories));
    let top_three_calories_sum: usize = inventories[0].total_calories
        + inventories[1].total_calories
        + inventories[2].total_calories;

    println!("{}", inventories[0].total_calories);
    println!("{}", top_three_calories_sum);
}
