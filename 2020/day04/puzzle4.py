import validators

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

    if not validators.is_year_valid(self.byr, 1920, 2002) or \
       not validators.is_year_valid(self.iyr, 2010, 2020) or \
       not validators.is_year_valid(self.eyr, 2020, 2030) or \
       not validators.is_height_valid(self.hgt) or \
       not validators.is_hair_color_valid(self.hcl) or \
       not validators.is_eye_color_valid(self.ecl) or \
       not validators.is_pid_valid(self.pid):
      return False 
    return True

def create_password(data):
  data = ' '.join(data).split(' ')
  return Passport(data)

passports = []
data = []

for line in file:
  if line.strip() == '':  
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