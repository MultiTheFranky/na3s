import { Arma3Server } from "shared";

import { arma3serverAPI } from "..";

/**
 * Function to get all arma3 servers
 * @param {string} token
 * @returns {Arma3Server[]} Servers
 */
export const getArma3Servers = async (token: string) => {
  const { data } = await arma3serverAPI.get("", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data as Arma3Server[];
};
