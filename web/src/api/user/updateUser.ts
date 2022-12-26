import { User } from "shared";

import { userAPI } from "..";

/**
 * Function to delete user by email
 * @param {User} user
 * @return {string} message
 */
export const updateUser = async (user: User) => {
  const { data } = await userAPI.put("/", {
    userToUpdate: {
      name: user.name,
      email: user.email,
      password: user.password,
      admin: user.admin,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  });
  return data as string;
};
