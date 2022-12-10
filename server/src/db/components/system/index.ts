import { System } from "shared";

import { restartSteamCMDCheckerSystem } from "../../../api/routes/steamcmd";
import { systemModel } from "./schema";

/**
 * Init System DB
 */
export const initSystemDb = async () => {
  const system = await systemModel.findOne();
  if (!system) {
    await systemModel.create({
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
export const getSystemDb = async (): Promise<System | null> => {
  return await systemModel.findOne();
};

/**
 * Update System DB
 * @param system System DB
 * @returns System DB
 */
export const updateSystemDb = async (system: System) => {
  const actualSystem = await getSystemDb();
  const systemUpdated = await systemModel.updateOne({}, system);
  if (actualSystem?.updateInterval !== system.updateInterval) {
    await restartSteamCMDCheckerSystem();
  }
  return systemUpdated;
};

/**
 * Delete System DB
 * @returns System DB
 */
export const deleteSystemDb = async () => {
  return await systemModel.deleteOne({});
};
