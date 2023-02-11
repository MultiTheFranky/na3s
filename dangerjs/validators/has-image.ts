export const hasImage = (description: string) => {
  const markdownImageRegex = /!\[[^\]]+]\([^)]+\)/;
  const htmlElementImageRegex = /<img.*src.*>/;

  return (
    markdownImageRegex.test(description) ||
    htmlElementImageRegex.test(description)
  );
};
