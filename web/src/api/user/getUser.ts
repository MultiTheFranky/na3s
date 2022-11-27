import { User } from "shared";

import { userAPI } from "..";

/**
 * Function to get user data by email
 * @param {string} email
 * @param {string} token
 * @return {User} token
 */
export const getUser = async (email: string, token: string) => {
  const { data } = await userAPI.get(`/${email}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return (await data) as User;
};
