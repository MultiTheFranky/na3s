/**
 * Gets a text avatar for a given string
 * @param {string} text
 * @returns {string} avatar text
 */
export const getAvatarText = (text: string) => {
  const words = text.split(" ");
  if (words.length === 1) {
    return words[0].charAt(0);
  }
  return words[0].charAt(0) + words[words.length - 1].charAt(0);
};
