import { getUpdateInterval } from "../../../db/components/system";
import { mainSteamCMD } from "./utils";

/**
 * Main function for steamcmd checker system
 */
export const initSteamCMDCheckerSystem = async () => {
  await mainSteamCMD();
  setInterval(async () => {
    await mainSteamCMD();
  }, 60000 * (await getUpdateInterval()));
};
