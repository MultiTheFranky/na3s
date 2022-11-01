import mongoose from "mongoose";

import { dbSystemSchema } from "./schema";

/**
 * Init System DB
 */
export const initSystemDb = async () => {
  const system = await mongoose.model("System", dbSystemSchema).findOne({});
  if (!system) {
    await mongoose.model("System", dbSystemSchema).create({
      firstExecution: true,
      updateInterval: 60,
    });
  }
};

/**
 * Set first execution
 * @param {boolean} firstExecution
 */
export const setFirstExecution = async (firstExecution: boolean) => {
  await mongoose
    .model("System", dbSystemSchema)
    .updateOne({}, { firstExecution });
};

/**
 * Get first execution
 * @returns {boolean}
 */
export const getFirstExecution = async (): Promise<boolean> => {
  const system = await mongoose.model("System", dbSystemSchema).findOne({});
  return system?.firstExecution || false;
};

/**
 * Set update interval
 * @param {number} updateInterval
 * @returns {Promise<void>}
 */
export const setUpdateInterval = async (updateInterval: number) => {
  await mongoose
    .model("System", dbSystemSchema)
    .updateOne({}, { updateInterval });
};

/**
 * Get update interval
 * @returns {number}
 * @returns {Promise<number>}
 */
export const getUpdateInterval = async (): Promise<number> => {
  const system = await mongoose.model("System", dbSystemSchema).findOne({});
  return system?.updateInterval || 60;
};

/**
 * Set debug
 * @param {boolean} debug
 * @returns {Promise<void>}
 */
export const setDebug = async (debug: boolean) => {
  await mongoose.model("System", dbSystemSchema).updateOne({}, { debug });
};

/**
 * Get debug
 * @returns {boolean}
 * @returns {Promise<boolean>}
 */
export const getDebug = async (): Promise<boolean> => {
  const system = await mongoose.model("System", dbSystemSchema).findOne({});
  return system?.debug || false;
};

/**
 * Set isSteamCMDRunning
 * @param {boolean} isSteamCMDRunning
 * @returns {Promise<void>}
 */
export const setIsSteamCMDRunning = async (isSteamCMDRunning: boolean) => {
  await mongoose
    .model("System", dbSystemSchema)
    .updateOne({}, { isSteamCMDRunning });
};

/**
 * Get isSteamCMDRunning
 * @returns {Promise<boolean>}
 */
export const getIsSteamCMDRunning = async (): Promise<boolean> => {
  const system = await mongoose.model("System", dbSystemSchema).findOne({});
  return system?.isSteamCMDRunning || false;
};
