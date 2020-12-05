import re

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