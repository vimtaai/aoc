file = open("puzzle9.in")

preamble_length = 25
numbers = []

for line in file:
  number = int(line.strip())
  numbers.append(number)

def is_invalid_number(number_index):
  for i in range(number_index - preamble_length, number_index - 1):
    for j in range(i + 1, number_index):
      if numbers[i] + numbers[j] == numbers[number_index]:
        return True
  return False

def find_invalid_number():
  for i in range(preamble_length, len(numbers)):
    if not is_invalid_number(i):
      return i

def part1():
  invalid_number_index = find_invalid_number()
  return numbers[invalid_number_index]

def part2():
  invalid_number_index = find_invalid_number()
  invalid_number = numbers[invalid_number_index]

  for i in range(0, invalid_number_index - 2):
    s = 0
    smallest = numbers[i]
    largest = numbers[i]
    for j in range(i, invalid_number_index):
      s += numbers[j]

      if numbers[j] > largest:
        largest = numbers[j]
      if numbers[j] < smallest:
        smallest = numbers[j]

      if s == invalid_number:
        return smallest + largest
      elif s > invalid_number:
        break

print(part1())
print(part2())
