/**
 * Files we are not checking for missing test files are blacklisted or that are test files themselves
 */
const blacklist = [
  /\.scss$/,
  /\.stories\./,
  /__mocks__/,
  /\/index\.tsx?$/,
  /\/actions\.ts$/,
  /\/types\.ts$/,
  /\/specs\.ts$/,
  /\/state\.ts$/,
];

const isTestFile = (filePath: string) =>
  filePath.includes('__snapshots__/') ||
  filePath.includes('.snap') ||
  filePath.includes('.spec') ||
  filePath.includes('.test');

const getMatchingSourceFileName = (filePath: string) =>
  filePath
    .replace('__snapshots__/', '')
    .replace('.snap', '')
    .replace('.spec', '')
    .replace('.test', '');

export const getFilesWithoutTestFile = (filePaths: string[]): string[] => {
  const whiteListedFiles = filePaths.filter(
    (path) => !blacklist.some((regex) => regex.test(path)),
  );

  const sourceFiles = whiteListedFiles.filter((file) => !isTestFile(file));

  const convertedTestFiles = whiteListedFiles.reduce<string[]>(
    (acc, path) =>
      isTestFile(path) ? [...acc, getMatchingSourceFileName(path)] : acc,
    [],
  );

  return sourceFiles.filter((file) => !convertedTestFiles.includes(file));
};
