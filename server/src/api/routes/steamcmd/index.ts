import { getSystemDb } from "../../../db/components/system";
import { logError } from "../../../logger";
import { mainSteamCMD } from "./utils";

/**
 * Main function for steamcmd checker system
 */
export const initSteamCMDCheckerSystem = async () => {
  await mainSteamCMD();
  const system = await getSystemDb();
  if (system) {
    setInterval(async () => {
      await mainSteamCMD();
    }, 60000 * system.updateInterval);
  } else {
    logError("System DB not found");
  }
};
