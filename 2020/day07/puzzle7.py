import re

file = open('puzzle7.in')

rules = {}
my_color = 'shiny gold'

for line in file:
  rule = line.strip()
  [container, content_list] = rule.split(' bags contain ')
  if content_list == 'no other bags.':
    rules[container] = []
  else:
    contents = content_list.split(', ')
    parsed_contents = []

    for content in contents:
      [amount, color] = content.split(' ', 1)
      parsed_contents.append({ 'amount': int(amount), 'color': re.sub(r' bags?\.?$', '', color) })
    rules[container] = parsed_contents

def search_containers(search_color):
  container_colors = set()

  for color in rules:
    for content in rules[color]:
      if content['color'] == search_color:
        container_colors.add(color);
        container_colors.update(search_containers(color))

  return container_colors

def part1():
  return len(search_containers(my_color))

def count_contents(search_color):
  content_count = 0

  for content in rules[search_color]:
    sub_content_count = count_contents(content['color'])
    content_count += content['amount'] * (sub_content_count + 1)

  return content_count

def part2():
  return count_contents(my_color)

print(part1())
print(part2())
