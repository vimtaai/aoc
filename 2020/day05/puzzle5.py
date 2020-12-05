file = open('puzzle5.in')
row_count = 128
col_count = 8

def partition_find(code, max_value, low_char, high_char):
  low = 0
  high = max_value - 1

  for letter in code:
    if letter == low_char:
      low += (high - low + 1) / 2
    if letter == high_char:
      high -= (high - low + 1) / 2

  return int(high)

def parse_row_code(row_code):
  return partition_find(row_code, row_count, 'B', 'F')

def parse_col_code(col_code):
  return partition_find(col_code, col_count, 'R', 'L')

def parse_seat_code(code):
  row_code = code[0:7] 
  col_code = code[7:10]

  row = parse_row_code(row_code)
  col = parse_col_code(col_code)

  return [row, col]

max_id = -1
seats = []

for line in file:
  row, col = parse_seat_code(line.strip())
  seat_id = row * 8 + col
  seats.append(seat_id)
  if max_id < seat_id:
    max_id = seat_id

print(max_id)

for seat_id in range(max_id, 0, -1):
  if not seat_id in seats:
    print(seat_id)
    break
