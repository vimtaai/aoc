file = open('puzzle1.in')
expenses = []
target_sum = 2020

for line in file:
  expense = int(line)
  expenses.append(expense)

def part1(expenses):
  for i in range(0, len(expenses) - 1):
    for j in range(i + 1, len(expenses)):
      if expenses[i] + expenses[j] == target_sum:
        print(expenses[i] * expenses[j])
        return

def part2(expenses):
  for i in range(0, len(expenses) - 1):
    for j in range(i + 1, len(expenses)):
      for k in range(j + 1, len(expenses)):
        if expenses[i] + expenses[j] + expenses[k] == target_sum:
          print(expenses[i] * expenses[j] * expenses[k])
          return

part1(expenses)
part2(expenses)