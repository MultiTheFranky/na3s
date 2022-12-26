import { User } from "shared";

import { userAPI } from "..";

/**
 * Function to get all users
 * @return {User} User
 */
export const getUsers = async () => {
  const { data } = await userAPI.get("");
  return data as User[];
};
