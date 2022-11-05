import mongoose from "mongoose";
import { System } from "shared";

import { dbSystemSchema } from "./schema";

/**
 * Init System DB
 */
export const initSystemDb = async () => {
  const system = (await mongoose
    .model("System", dbSystemSchema)
    .findOne({})) as System;
  if (!system) {
    await mongoose.model("System", dbSystemSchema).create({
      firstExecution: true,
      updateInterval: 60,
      debug: true,
      isSteamCMDRunning: false,
    });
  }
};

/**
 * Get System DB
 * @returns System DB
 */
export const getSystemDb = async () => {
  return await mongoose.model("System", dbSystemSchema).findOne({});
};

/**
 * Update System DB
 * @param system System DB
 * @returns System DB
 */
export const updateSystemDb = async (system: any) => {
  return await mongoose.model("System", dbSystemSchema).updateOne({}, system);
};

/**
 * Delete System DB
 * @returns System DB
 */
export const deleteSystemDb = async () => {
  return await mongoose.model("System", dbSystemSchema).deleteOne({});
};
