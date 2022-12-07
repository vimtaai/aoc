const inputData = (await Deno.readTextFile("input.in")).split("\n");

const SMALL_SIZE_LIMIT = 100_000;
const DISK_SIZE = 70_000_000;
const REQUIRED_SPACE = 30_000_000;

let currentPath = [];
let files = {};
let dirs = {};

function runCommand(line) {
  const [command, arg] = line.split(" ");

  if (command !== "cd") {
    return;
  }

  if (arg === "..") {
    currentPath.pop();
    return;
  }

  if (arg === "/") {
    currentPath = [];
    return;
  }

  currentPath.push(arg);
}

function getDirByPath(path) {
  let currentDir = files;

  for (const dir of path) {
    currentDir = currentDir[dir];
  }

  return currentDir;
}

function calculateDirSize(dir) {
  let size = 0;

  for (const key of Object.keys(dir)) {
    if (typeof dir[key] === "number") {
      size += dir[key];
    } else {
      size += calculateDirSize(dir[key]);
    }
  }

  return size;
}

for (const line of inputData) {
  if (line.startsWith("$ ")) {
    runCommand(line.slice(2));
    continue;
  }

  const [info, basename] = line.split(" ");
  const currentDir = getDirByPath(currentPath);
  const currentDirName = currentPath.length === 0 ? "" : `/${currentPath.join("/")}`;

  if (info === "dir") {
    const newDirName = `${currentDirName}/${basename}`;

    currentDir[basename] = {};
    dirs[newDirName] = currentDir[basename];
  } else {
    currentDir[basename] = Number(info);
  }
}

const dirSizes = Object.entries(dirs).map(([dirname, dir]) => ({
  dirname,
  size: calculateDirSize(dir),
}));

const smallDirs = dirSizes.filter(({ size }) => size < SMALL_SIZE_LIMIT);
const usedSpace = calculateDirSize(files);
const freeSpace = DISK_SIZE - usedSpace;

dirSizes.sort((dirA, dirB) => dirA.size - dirB.size);

const dirToDelete = dirSizes.find(({ size }) => {
  return freeSpace + size >= REQUIRED_SPACE;
});

console.log(smallDirs.reduce((sum, { size }) => sum + size, 0));
console.log(dirToDelete.size);
