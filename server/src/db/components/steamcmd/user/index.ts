import mongoose from "mongoose";
import { SteamCMDUser } from "shared";

import { DBSteamCMDUserSchema } from "./schema";

/**
 * Get a SteamCMDUser by its username.
 * @param {string} username - The username of the steamcmd user
 * @return {Promise<SteamCMDUser | null>} A promise that resolves with the SteamCMDUser or null if not found
 */
export const getSteamCMDUser = async (): Promise<SteamCMDUser | undefined> => {
  const user = await mongoose
    .model("SteamCMDUser", DBSteamCMDUserSchema)
    .findOne();
  if (!user) {
    return undefined;
  }
  return user;
};

/**
 * Create a new SteamCMDUser.
 * @param {SteamCMDUser} user - The SteamCMDUser to create
 * @return {Promise<SteamCMDUser>} A promise that resolves with the created SteamCMDUser
 */
export const createSteamCMDUser = async (
  user: SteamCMDUser
): Promise<SteamCMDUser> => {
  return await mongoose
    .model("SteamCMDUser", DBSteamCMDUserSchema)
    .create(user);
};

/**
 * Update a SteamCMDUser by its username.
 * @param {string} username - The username of the SteamCMDUser to update
 * @param {SteamCMDUser} user - The SteamCMDUser to update
 * @return {Promise<SteamCMDUser | null>} A promise that resolves with the updated SteamCMDUser or null if not found
 */
export const updateSteamCMDUser = async (
  username: string,
  user: SteamCMDUser
): Promise<SteamCMDUser | null> => {
  return await mongoose
    .model("SteamCMDUser", DBSteamCMDUserSchema)
    .findOneAndUpdate({ username }, user);
};

/**
 * Delete a SteamCMDUser by its username.
 * @param {string} username - The username of the SteamCMDUser to delete
 * @return {Promise<SteamCMDUser | null>} A promise that resolves with the deleted SteamCMDUser or null if not found
 */
export const deleteSteamCMDUser = async (
  username: string
): Promise<SteamCMDUser | null> => {
  return await mongoose
    .model("SteamCMDUser", DBSteamCMDUserSchema)
    .findOneAndDelete({ username });
};
