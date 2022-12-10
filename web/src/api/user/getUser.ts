import { User } from "shared";

import { userAPI } from "..";

/**
 * Function to get user data by email
 * @param {string} email
 * @param {string} token
 * @return {User} token
 */
export const getUser = async (email: string, token?: string) => {
  const { data } = await userAPI.get(
    `/${email}`,
    token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : undefined
  );
  return data as User;
};
