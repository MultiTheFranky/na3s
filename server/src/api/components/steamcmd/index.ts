import { exec } from "child_process";

import { SteamCMDCommand } from "shared";

import { logError, logInfo } from "../../../logger";

/**
 * Function to run steamcmd
 * @param {SteamCMDCommand[]} args The steamcmd args
 */
export const runtSteamCMD = async (args?: SteamCMDCommand[]) => {
  const argsString = args && args.length ? args .map((arg) => `${arg.command} ${arg.args.join(" ")}`).join(" +") : "";

  const { stdout, stderr } = await exec(`/steamcmd/steamcmd.sh${argsString}`);

  if (stdout)
    stdout?.on("data", (data) => {
      logInfo(data);
    });

  if (stderr)
    stderr?.on("data", (data) => {
      logError(data);
    });
};
