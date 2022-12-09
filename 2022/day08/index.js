const treeMap = (await Deno.readTextFile("input.in")).split("\n").map((row) => row.split(""));

function getTreesInDirections(treeMap, x, y) {
  const treesInRow = treeMap[y];
  const treesInColumn = treeMap.flatMap((row) => row[x]);

  const treesToWest = treesInRow.slice(0, x);
  const treesToEast = treesInRow.slice(x + 1);
  const treesToNorth = treesInColumn.slice(0, y);
  const treesToSouth = treesInColumn.slice(y + 1);

  return [treesToWest, treesToEast, treesToNorth, treesToSouth];
}

function isTreeVisibleFromAnyDirection(treeHeight, treesInDirections) {
  return treesInDirections.some((trees) =>
    trees.every((otherTreeHeight) => otherTreeHeight < treeHeight)
  );
}

function isTreeVisible(treeMap, x, y) {
  const treeHeight = treeMap[y][x];
  const treesInDirections = getTreesInDirections(treeMap, x, y);

  return isTreeVisibleFromAnyDirection(treeHeight, treesInDirections);
}

function getViewingDistance(treeHeight, trees) {
  let numberOfVisibleTrees = 0;

  for (const otherTreeHeight of trees) {
    numberOfVisibleTrees += 1;

    if (otherTreeHeight >= treeHeight) {
      return numberOfVisibleTrees;
    }
  }

  return numberOfVisibleTrees;
}

function getScenicScoreForTree(treeMap, x, y) {
  const treeHeight = treeMap[y][x];
  const treesInDirections = getTreesInDirections(treeMap, x, y);

  const [treesToWest, treesToEast, treesToNorth, treesToSouth] = treesInDirections;

  const viewingDistanceToWest = getViewingDistance(treeHeight, treesToWest.reverse());
  const viewingDistanceToEast = getViewingDistance(treeHeight, treesToEast);
  const viewingDistanceToNorth = getViewingDistance(treeHeight, treesToNorth.reverse());
  const viewingDistanceToSouth = getViewingDistance(treeHeight, treesToSouth);

  return (
    viewingDistanceToWest * viewingDistanceToEast * viewingDistanceToNorth * viewingDistanceToSouth
  );
}

const numberOfVisibleTrees = treeMap
  .map((row, y) => row.filter((_, x) => isTreeVisible(treeMap, x, y)).length)
  .reduce((count, numberOfVisibleTreesInRow) => count + numberOfVisibleTreesInRow, 0);

const highestScenicScore = treeMap
  .flatMap((row, y) => row.map((_, x) => getScenicScoreForTree(treeMap, x, y)))
  .sort((a, b) => a - b)
  .at(-1);

console.log(numberOfVisibleTrees);
console.log(highestScenicScore);
