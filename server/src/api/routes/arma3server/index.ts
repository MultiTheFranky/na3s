import { exec } from "child_process";

import { Arma3ServerConfig } from "shared";

import { logError, logInfo } from "../../../logger";

/**
 * Function to start the Arma 3 server
 * @param config The server config
 */
export const startArma3Server = async (config: Arma3ServerConfig) => {
  const { stdout, stderr } = await exec(`arma3server.exe ${config}`);

  if (stdout)
    stdout?.on("data", (data) => {
      logInfo(data);
    });

  if (stderr)
    stderr?.on("data", (data) => {
      logError(data);
    });
};
