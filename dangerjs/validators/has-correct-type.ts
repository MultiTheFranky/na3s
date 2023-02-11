import { types } from '../const';

export const hasCorrectType = (title: string): boolean =>
  new RegExp(`^\s*(${types.join('|')}).*`).test(title);
