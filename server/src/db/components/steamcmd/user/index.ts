import { SteamCMDUser } from "shared";

import { steamCMDModel } from "./schema";

/**
 * Get a SteamCMDUser by its username.
 * @return {Promise<SteamCMDUser | null>} A promise that resolves with the SteamCMDUser or null if not found
 */
export const getSteamCMDUser = async (): Promise<SteamCMDUser | null> => {
  const user = await steamCMDModel.findOne();
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
  return await steamCMDModel.create(user);
};

/**
 * Update a SteamCMDUser by its username.
 * @param {SteamCMDUser} user - The SteamCMDUser to update
 * @return {Promise<SteamCMDUser | null>} A promise that resolves with the updated SteamCMDUser or null if not found
 */
export const updateSteamCMDUser = async (
  user: SteamCMDUser
): Promise<SteamCMDUser | null> => {
  return await steamCMDModel.findOneAndUpdate({}, user);
};

/**
 * Delete a SteamCMDUser by its username.
 * @param {string} username - The username of the SteamCMDUser to delete
 * @return {Promise<SteamCMDUser | null>} A promise that resolves with the deleted SteamCMDUser or null if not found
 */
export const deleteSteamCMDUser = async (
  username: string
): Promise<SteamCMDUser | null> => {
  return await steamCMDModel.findOneAndDelete({ username });
};
