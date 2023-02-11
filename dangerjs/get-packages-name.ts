import * as path from 'path';

export const getPackageNames = (filePaths: string[]): string[] => {
  const names = filePaths.reduce<string[]>((acc, filePath) => {
    const { dir } = path.parse(filePath);
    const dirPath: string[] = path.normalize(dir).split(path.sep);

    const name: string =
      dirPath.find((item, index) => dirPath[index - 1] === 'src') || '';

    return name && acc.includes(name) ? acc : [...acc, name];
  }, []);

  return names.filter((v) => v);
};
