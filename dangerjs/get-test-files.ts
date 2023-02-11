export const getTestFiles = (filePaths: string[]) =>
  filePaths.filter((item) => item.includes('.test.'));

export const getSpecFiles = (filePaths: string[]) =>
  filePaths.filter((item) => item.includes('.spec.'));
