import re

file = open('puzzle4.in')

class Passport:
  def __init__(self, data):
    for info in data:
      name, value = info.split(':')
      setattr(self, name, value)

  def is_all_keys_present(self):
    required_attributes = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
    for attribute in required_attributes:
      if not hasattr(self, attribute):
        return False
    return True

  def is_valid(self):
    if not self.is_all_keys_present():
      return False

    if not is_year_valid(self.byr, 1920, 2002) or \
       not is_year_valid(self.iyr, 2010, 2020) or \
       not is_year_valid(self.eyr, 2020, 2030) or \
       not is_height_valid(self.hgt) or \
       not is_hair_color_valid(self.hcl) or \
       not is_eye_color_valid(self.ecl) or \
       not is_pid_valid(self.pid):
      return False 
    return True

def is_year_valid(value, min, max):
  if not value.isnumeric():
    return False

  return min <= int(value) <= max;

def is_height_valid(value):
  unit = value[len(value)-2:len(value)]
  if unit != 'cm' and unit != 'in':
    return False
  
  number = int(value[0:len(value)-2])
  return (unit == 'cm' and (150 <= number <= 193)) or (unit == 'in' and (59 <= number <= 76))

def is_hair_color_valid(value):
  return re.search('^#[0-9a-f]{6}$', value) != None

def is_eye_color_valid(value):
  eye_colors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
  return value in eye_colors

def is_pid_valid(value):
  return re.search('^[0-9]{9}$', value) != None

def create_password(data):
  data = ' '.join(data).split(' ')
  return Passport(data)

passports = []
data = []

for line in file:
  if (line.strip() == ''):  
    passports.append(create_password(data))
    data = []
  else:
    data.append(line.strip())
passports.append(create_password(data))

count_part1 = 0
count_part2 = 0

for passport in passports:
  if passport.is_all_keys_present():
    count_part1 += 1
  if passport.is_valid():
    count_part2 += 1

print(count_part1)
print(count_part2)