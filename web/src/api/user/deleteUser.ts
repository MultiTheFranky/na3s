import { userAPI } from "..";

/**
 * Function to delete user by email
 * @param {string} email
 * @param {string} token
 * @return {string} message
 */
export const deleteUser = async (email: string, token: string) => {
  const { data } = await userAPI.delete("", {
    data: {
      email,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data as string;
};
