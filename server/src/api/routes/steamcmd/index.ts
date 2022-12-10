import { getSystemDb } from "../../../db/components/system";
import { logError } from "../../../logger";
import { mainSteamCMD } from "./utils";

let interval: NodeJS.Timer;

/**
 * Main function for steamcmd checker system
 */
export const initSteamCMDCheckerSystem = async () => {
  await mainSteamCMD();
  const system = await getSystemDb();
  if (system) {
    interval = setInterval(async () => {
      await mainSteamCMD();
    }, 60000 * system.updateInterval);
  } else {
    logError("System DB not found");
  }
};

/**
 * Function to restart steamcmd checker system
 * @param interval Interval
 */
export const restartSteamCMDCheckerSystem = async () => {
  clearInterval(interval);
  await initSteamCMDCheckerSystem();
};
