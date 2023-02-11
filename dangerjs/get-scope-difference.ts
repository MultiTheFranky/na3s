export const getScopeDifference = (
  scope: string[],
  files: string[],
): {
  moreInTitleScope: string[];
  moreInFilesScope: string[];
} => {
  const { moreInA, moreInB } = getDifference(scope, files);

  return {
    moreInTitleScope: moreInA,
    moreInFilesScope: moreInB,
  };
};

const getDifference = (
  arrayA: string[],
  arrayB: string[],
): {
  moreInA: string[];
  moreInB: string[];
} => {
  const moreInA = arrayA
    .filter((item) => !arrayB.includes(item))
    .map((item) => item.replace(/\s/, ''));
  const moreInB = arrayB
    .filter((item) => !arrayA.includes(item))
    .map((item) => item.replace(/\s/, ''));

  return {
    moreInA,
    moreInB,
  };
};
