/**
 * Get nick from email
 * @param {string} email
 * @returns
 */
export const getNickFromEmail = (email: string) => {
  let [nick] = email.split("@");
  nick = nick.replace(/[^a-zA-Z0-9]/g, " ");

  // Uppercase all first letters after space
  nick = nick.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });

  return nick;
};
