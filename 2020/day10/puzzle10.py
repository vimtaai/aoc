file = open("puzzle10.in")

def find_adapter_position(adapters, new_adapter):
  i = 0

  while i < len(adapters) and adapters[i] < adapter:
    i += 1

  return i

adapters = [0]

for line in file:
  adapter = int(line.strip())
  index = find_adapter_position(adapters, adapter)
  adapters.insert(index, adapter)

adapters.append(adapters[-1] + 3)

def part1():
  joltage_diffs = {1: 0, 2: 0, 3: 0}
  current_joltage = adapters[0]
  for index in range(1, len(adapters)):
    adapter = adapters[index]
    joltage_diff = adapter - current_joltage
    joltage_diffs[joltage_diff] += 1
    current_joltage = adapter
  return joltage_diffs[1] * joltage_diffs[3]

def permutationCount(adapter_index, permutations):
  adapter = adapters[adapter_index]
  if adapter == adapters[-1]:
    return 1

  count = 0
  i = 1
  while True:
    if (adapter_index + i) >= len(adapters):
      break

    followup_adapter = adapters[adapter_index + i]
    if followup_adapter > adapter + 3:
      break

    count += permutations[adapter_index + i]
    i += 1

  return count

def part2():
  permutations = {}
  for i in range(len(adapters) - 1, -1, -1):
    permutations[i] = permutationCount(i, permutations)
  
  return permutations[0]

print(part1())
print(part2())
