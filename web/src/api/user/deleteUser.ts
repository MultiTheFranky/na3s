import { userAPI } from "..";

/**
 * Function to delete user by email
 * @param {string} email
 * @return {string} message
 */
export const deleteUser = async (email: string) => {
  const { data } = await userAPI.delete("", {
    data: {
      email,
    },
  });
  return data as string;
};
