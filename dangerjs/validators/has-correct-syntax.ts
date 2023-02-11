export const hasCorrectSyntax = (title: string): boolean =>
  /^\w+(\(.*\))?: (.*)/.test(title);
