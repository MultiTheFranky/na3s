import { User } from "shared";

import { userAPI } from "..";

/**
 * Function to delete user by email
 * @param {string} email
 * @param {string} token
 * @return {string} message
 */
export const addUser = async (user: User, token: string) => {
  const { data } = await userAPI.post(
    "/register",
    {
      email: user.email,
      password: user.password,
      name: user.name,
      admin: user.admin,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data as string;
};
