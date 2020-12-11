const input = await Deno.readTextFile("puzzle6.in");

type AnswerObject = { [question: string]: number };
type Group = { count: number; answers: AnswerObject };

function createAnswerObjects(answers: string[]): AnswerObject[] {
  return answers
    .map((answer) => Array.from(answer).map((question: string) => [question, 1]))
    .map((answer) => Object.fromEntries(answer));
}

function sumAnswers(answers: AnswerObject[]) {
  return {
    count: answers.length,
    answers: answers.reduce((sum, answerObject) => mergeAnswerObjects(answerObject, sum), {}),
  };
}

function mergeAnswerObjects(fromObject: AnswerObject, toObject: AnswerObject) {
  const mergedAnswers = { ...toObject };
  for (const question in fromObject) {
    if (mergedAnswers[question]) {
      mergedAnswers[question] += fromObject[question];
    } else {
      mergedAnswers[question] = fromObject[question];
    }
  }
  return mergedAnswers;
}

function sumPart1(sum: number, group: Group) {
  return sum + Object.values(group.answers).length;
}

function sumPart2(sum: number, group: Group) {
  return sum + Object.values(group.answers).filter((count: number) => count === group.count).length;
}

const groups = input
  .split(/\n\n/)
  .map((group: string) => group.split(/\n/))
  .map(createAnswerObjects)
  .map(sumAnswers);

console.log(groups.reduce(sumPart1, 0));
console.log(groups.reduce(sumPart2, 0));
