const input = await Deno.readTextFile("puzzle7.in");

type Content = {
  amount: number;
  color: string;
};

type Rule = {
  container: string;
  contents: Content[];
};

const myColor = "shiny gold";

function parseContent(content: string) {
  const [amount, ...colorParts] = content.replace(/ bags?\.?/, "").split(" ");
  return { amount: parseInt(amount), color: colorParts.join(" ") };
}

function parseRule(rule: string) {
  const [container, contentList] = rule.split(" bags contain ");
  const contents =
    contentList === "no other bags." ? [] : contentList.split(", ").map(parseContent);
  return { container, contents };
}

const rules = input.split("\n").map(parseRule);

function searchContainers(searchColor: string) {
  const containers: string[] = rules
    .filter((rule: Rule) => rule.contents.some((content: Content) => content.color === searchColor))
    .map((rule: Rule) => rule.container)
    .map((color: string) => [color, ...searchContainers(color)])
    .flat();

  return [...new Set(containers)];
}

function part1() {
  return searchContainers(myColor).length;
}

function countContents(searchColor: string): number {
  const colorRule = rules.find((rule: Rule) => rule.container === searchColor);

  if (!colorRule) {
    return 0;
  }

  return colorRule.contents
    .map((content: Content) => content.amount * (countContents(content.color) + 1))
    .reduce((sum: number, contentCount: number) => sum + contentCount, 0);
}

function part2() {
  return countContents(myColor);
}

console.log(part1());
console.log(part2());
