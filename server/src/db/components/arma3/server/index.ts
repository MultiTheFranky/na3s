import mongoose from "mongoose";
import { Arma3Server } from "shared";

import { DBArma3ServerSchema } from "./schema";

/**
 * Function to get a server
 * @param {string} id - The id of the Arma 3 server
 * @return {Promise<Arma3Server | null>} A promise that resolves with the Arma 3 server or null if not found
 */
export const getArma3Server = async (
  id: string
): Promise<Arma3Server | undefined> => {
  const server = await mongoose
    .model("arma3Server", DBArma3ServerSchema)
    .findOne({ id });
  if (!server) {
    return undefined;
  }
  return server.toObject() as Arma3Server;
};

/**
 * Function to get all servers
 */
export const getArma3Servers = async (): Promise<Arma3Server[]> => {
  return await mongoose.model("arma3Server", DBArma3ServerSchema).find();
};

/**
 * Function to create a new server
 * @param {Arma3Server} server - The Arma 3 server to create
 * @return {Promise<Arma3Server>} A promise that resolves with the created Arma 3 server
 */
export const createArma3Server = async (
  server: Arma3Server
): Promise<Arma3Server> => {
  return await mongoose
    .model("arma3Server", DBArma3ServerSchema)
    .create(server);
};

/**
 * Function to update a server
 * @param {string} id - The id of the Arma 3 server to update
 * @param {Arma3Server} server - The Arma 3 server to update
 * @return {Promise<Arma3Server | null>} A promise that resolves with the updated Arma 3 server or null if not found
 */
export const updateArma3Server = async (
  id: string,
  server: Arma3Server
): Promise<Arma3Server | null> => {
  return await mongoose
    .model("arma3Server", DBArma3ServerSchema)
    .findOneAndUpdate({ id }, server);
};

/**
 * Function to delete a server
 * @param {string} id - The id of the Arma 3 server to delete
 * @return {Promise<Arma3Server | null>} A promise that resolves with the deleted Arma 3 server or null if not found
 */
export const deleteArma3Server = async (
  id: string
): Promise<Arma3Server | null> => {
  return await mongoose
    .model("arma3Server", DBArma3ServerSchema)
    .findOneAndDelete({ id });
};
