export const types = ['chore', 'ci', 'feat', 'fix', 'refactor', 'revert'];
type Type = typeof types[number];

const isType = (type: Type, title: string): boolean => title.startsWith(type);
export const isChore = isType.bind(null, 'chore');
export const isCi = isType.bind(null, 'ci');
export const isFeat = isType.bind(null, 'feat');
export const isFix = isType.bind(null, 'fix');
export const isRefactor = isType.bind(null, 'refactor');
export const isRevert = isType.bind(null, 'revert');
