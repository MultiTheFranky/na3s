import { Arma3Server } from "shared";

import { arma3serverAPI } from "..";

/**
 * Function to get all arma3 servers
 * @param {Arma3Server} server
 * @returns {string} answer
 */
export const addServer = async (server: Arma3Server) => {
  const { data } = await arma3serverAPI.post("", server);
  return data as string;
};
