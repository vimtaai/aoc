file = open('puzzle3.in')
map = []
slopes = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2]
]

for line in file:
  map.append(line.strip())

treeproduct = 1;

for slope in slopes:
  right, down = slope
  trees = 0
  x = 0
  y = 0
  
  while y < len(map):
    if map[y][x] == '#': 
      trees += 1
    y = y + down
    x = (x + right) % (len(line))
  treeproduct *= trees

print(len(map))
print(treeproduct)

