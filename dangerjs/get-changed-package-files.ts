export const getChangedPackageFiles = (filePaths: string[]) =>
  filePaths.filter(
    (filePath) =>
      !filePath.match(/index.ts(x?)$/) &&
      filePath.match(/^packages\/.*\/src\/(.*).ts(x?)/) &&
      !filePath.includes('__generated__'),
  );
