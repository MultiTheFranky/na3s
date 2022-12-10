import { User } from "shared";

import { userAPI } from "..";

/**
 * Function to get all users
 * @param {string} token
 * @return {User} User
 */
export const getUsers = async (token: string) => {
  const { data } = await userAPI.get("", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data as User[];
};
