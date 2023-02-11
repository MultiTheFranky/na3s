export const getNamesFromTitle = (title: string): string[] => {
  if (!title) {
    return [];
  }

  const regex = /^.*\((.*)\):.*/;
  const [, names = ''] = regex.exec(title) || [];

  if (!names) {
    return [];
  }

  return names.replace(/\s/, '').split(',');
};
