export const hasManyScope = (title: string): boolean =>
  /.*\(many\):.*/.test(title);
