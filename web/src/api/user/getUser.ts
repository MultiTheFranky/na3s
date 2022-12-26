import { User } from "shared";

import { userAPI } from "..";

/**
 * Function to get user data by email
 * @param {string} email
 * @return {User} token
 */
export const getUser = async (email: string) => {
  const { data } = await userAPI.get(`/${email}`);
  return data as User;
};
