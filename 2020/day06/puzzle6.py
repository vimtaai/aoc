file = open('puzzle6.in')

groups = []
current_group = { 'people_count': 0, 'answers': {} }

for line in file:
  if line.strip() == "":
    groups.append(current_group)
    current_group = { 'people_count': 0, 'answers': {} }
  else:
    current_group['people_count'] += 1;
    for char in line.strip():
      if char in current_group['answers']:
        current_group['answers'][char] += 1
      else: 
        current_group['answers'][char] = 1
groups.append(current_group)

part1_count = 0
part2_count = 0
for group in groups:
  part1_count += len(group['answers'])

  for question in group['answers']:
    if group['answers'][question] == group['people_count']:
      part2_count += 1

print(part1_count)
print(part2_count)