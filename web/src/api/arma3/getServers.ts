import { Arma3Server } from "shared";

import { arma3serverAPI } from "..";

/**
 * Function to get all arma3 servers
 * @returns {Arma3Server[]} Servers
 */
export const getArma3Servers = async () => {
  const { data } = await arma3serverAPI.get("");
  return data as Arma3Server[];
};
