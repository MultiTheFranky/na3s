import { User } from "shared";

import { userAPI } from "..";

/**
 * Function to delete user by email
 * @param {string} email
 * @return {string} message
 */
export const addUser = async (user: User) => {
  const { data } = await userAPI.post("/register", {
    email: user.email,
    password: user.password,
    name: user.name,
    admin: user.admin,
  });
  return data as string;
};
