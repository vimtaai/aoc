file = open('puzzle8.in')

instructions = []
executed_instuctions = []

for line in file:
  [operation, argument] = line.strip().split(' ')
  instructions.append({ 'operation': operation, 'argument': int(argument) })

def part1():
  accumulator = 0
  current_instruction = 0

  while True:
    if current_instruction in executed_instuctions:
      break

    executed_instuctions.append(current_instruction)

    if instructions[current_instruction]['operation'] == 'nop':
      current_instruction += 1
      continue

    if instructions[current_instruction]['operation'] == 'jmp':
      current_instruction += instructions[current_instruction]['argument']
    elif instructions[current_instruction]['operation'] == 'acc':
      accumulator += instructions[current_instruction]['argument']
      current_instruction += 1

  return accumulator

print(part1())

executed_instuctions = []
swapped_instructions = []

def swap_instruction(instruction_index):
  #print('swapping', instruction_index+1, 'from', instructions[instruction_index]['operation'])
  if instructions[instruction_index]['operation'] == 'jmp':
    instructions[instruction_index]['operation'] = 'nop'
  else:
    instructions[instruction_index]['operation'] = 'jmp'
  
def go_back():
  accumulator = 0
  if len(swapped_instructions) > 0:
    swapped_instruction = swapped_instructions[-1]
  else:
    swapped_instruction = None

  while True:
    instruction_to_revert = executed_instuctions.pop()
    #print('going back from', current_instruction + 1, 'to', instruction_to_revert + 1, accumulator)

    if instructions[instruction_to_revert]['operation'] == 'acc':
      accumulator -= instructions[instruction_to_revert]['argument']
    else:      
      if instruction_to_revert == swapped_instruction:
        swap_instruction(instruction_to_revert)
        swapped_instruction = None

      if swapped_instruction == None and not instruction_to_revert in swapped_instructions:
        swapped_instructions.append(instruction_to_revert)
        swap_instruction(instruction_to_revert)
        break
  
  return [instruction_to_revert, accumulator]

def part2():
  accumulator = 0
  current_instruction = 0

  while current_instruction < len(instructions):
    if current_instruction in executed_instuctions:
      [new_instruction, accumulator_change] = go_back()

      current_instruction = new_instruction
      accumulator += accumulator_change

    #print('forward', current_instruction + 1, instructions[current_instruction], accumulator)
    executed_instuctions.append(current_instruction)

    if instructions[current_instruction]['operation'] == 'acc':
      accumulator += instructions[current_instruction]['argument']
      current_instruction += 1
    elif instructions[current_instruction]['operation'] == 'nop':
      current_instruction += 1
    elif instructions[current_instruction]['operation'] == 'jmp':
      current_instruction += instructions[current_instruction]['argument']

  return accumulator

print(part2())
