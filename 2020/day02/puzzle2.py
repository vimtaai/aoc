file = open('puzzle2.in')

class Password:
  def __init__(self, line):
    policy, password = line.split(': ')
    numbers, letter = policy.split(' ')
    numberA, numberB = numbers.split('-')
    self.password = password
    self.numberA = int(numberA)
    self.numberB = int(numberB)
    self.letter = letter

  def is_part1_valid(self):
    count = 0

    for letter in self.password:
      if letter == self.letter:
        count += 1

    return self.numberA <= count <= self.numberB

  def is_part2_valid(self):
    numberAMatches = self.password[self.numberA - 1] == self.letter
    numberBMatches = self.password[self.numberB - 1] == self.letter

    return numberAMatches != numberBMatches

count_part1 = 0
count_part2 = 0

for line in file:
  password = Password(line)
  if password.is_part1_valid():
    count_part1 += 1
  if password.is_part2_valid():
    count_part2 += 1

print(count_part1)
print(count_part2)