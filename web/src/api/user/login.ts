import { userAPI } from "..";
/**
 * Function to login a user
 * @param {string} email
 * @param {string} password
 * @return {string} token
 */
export const login = async (email: string, password: string) => {
  const { data } = await userAPI.post("/login", {
    email,
    password,
  });
  return await data.token;
};
