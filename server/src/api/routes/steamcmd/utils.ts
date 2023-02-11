import { exec } from "child_process";
import { statSync } from "fs";
import internal from "stream";

import axios from "axios";
import { DateTime } from "luxon";
import { SteamCMDCommand, SteamCMDUser } from "shared";
import { Mod } from "shared/src/types/arma3/Mod";

import { getArma3Servers } from "../../../db/components/arma3/server";
import { getSteamCMDUser } from "../../../db/components/steamcmd/user";
import { getSystemDb, updateSystemDb } from "../../../db/components/system";
import { logError, logInfo, logWarn } from "../../../logger";
import { wsSend } from "../../websocket";

/**
 * Main function to check and update the server and mods
 * @return {Promise<void>}
 */
export const mainSteamCMD = async () => {
  // Get the steamcmd user
  const user = await getSteamCMDUser();
  if (!user) {
    logWarn("No steamcmd user found");
    return;
  }
  const system = await getSystemDb();
  if (!system) {
    logWarn("No system db found");
    return;
  }
  // Get the arma 3 servers
  const servers = await getArma3Servers();
  // If server is not updated and all servers are stopped, update it
  if (!(await isServerUpdated()) && !servers.find((s) => s.isOn)) {
    await updateServer(user);
  }
  // Update all outdated mods
  for (const server of servers) {
    const modsToUpdate = server.mods.filter((mod) => !isModUpdated(mod));
    if (modsToUpdate.length > 0 && !server.isOn) {
      await updateMods(modsToUpdate, user);
    }
  }
  system.isSteamCMDRunning = false;
  await updateSystemDb(system);
};

/**
 * Function to run steamcmd
 * @param {SteamCMDCommand[]} args The steamcmd args
 */
export const runSteamCMD = async (
  onData: (data: string, stdin: internal.Writable) => void,
  onError: (data: string) => void,
  args?: SteamCMDCommand[]
) => {
  const argsString =
    args && args.length
      ? args.map((arg) => `${arg.command} ${arg.args.join(" ")}`).join(" ")
      : "";

  const system = await getSystemDb();

  if (!system) {
    logWarn("No system db found");
    return;
  }

  if (system && system.isSteamCMDRunning) {
    logWarn("SteamCMD is already running");
    return;
  }

  system.isSteamCMDRunning = true;
  await updateSystemDb(system);

  if (system && system.debug) {
    logInfo(`/steamcmd/steamcmd.sh ${argsString}`);
  }

  const child = await exec(`/steamcmd/steamcmd.sh ${argsString}`);

  if (child.stdout)
    child.stdout?.on("data", (data) => {
      if (child.stdin) {
        onData(data, child.stdin);
      }
    });

  if (child.stderr)
    child.stderr?.on("data", (data) => {
      onError(data);
    });

  child.on("exit", () => {
    system.isSteamCMDRunning = false;
    updateSystemDb(system);
  });
};

/**
 * Function to update the arma 3 server
 */
export const updateServer = async (user: SteamCMDUser) => {
  let steamGuard = false;
  await runSteamCMD(
    (data, stdin) => {
      logInfo(data);
      if (steamGuard) {
        steamGuard = false;
      }
      if (
        data.includes(`Logging in user '${user.username}' to Steam Public...`)
      ) {
        setTimeout(() => {
          if (steamGuard) {
            logInfo("Requesting steam guard code");
            wsSend({
              type: "steamGuard",
              message: "Please enter the steam guard code",
            });
            // Wait for the steam guard code
            const interval = setInterval(async () => {
              const user = await getSteamCMDUser();
              if (user && user.steamGuardCode) {
                clearInterval(interval);
                steamGuard = false;
                stdin.write(`${user.steamGuardCode}\n`);
                stdin.end();
              }
            }, 1000);
          }
        }, 5000);
        steamGuard = true;
      }
    },
    (data) => {
      logError(data);
    },
    [
      forceInstallDirSteamCMD(),
      loginSteamCMD(user.username, user.password),
      installArma3SteamCMD(),
      validateSteamCMD(),
    ]
  );
};

/**
 * Function to update the mods
 * @param {Mod[]} mods The mods to install/update
 */
export const updateMods = async (mods: Mod[], user: SteamCMDUser) => {
  await runSteamCMD(
    (data) => {
      logInfo(data);
    },
    (data) => {
      logError(data);
    },
    [
      forceInstallDirSteamCMD(),
      loginSteamCMD(user.username, user.password),
      ...installModsSteamCMD(mods),
      validateSteamCMD(),
    ]
  );
};

/**
 * Function to generate the login steamcmd command
 * @param {string} username
 * @param {string} password
 * @return {SteamCMDCommand} The steamcmd login command
 */
export const loginSteamCMD = (
  username: string,
  password: string
): SteamCMDCommand => {
  return {
    command: "+login",
    args: [username, password],
  };
};

/**
 * Function to force install dir for steamcmd
 */
export const forceInstallDirSteamCMD = (): SteamCMDCommand => {
  return {
    command: "+force_install_dir",
    args: ["/arma3"],
  };
};

/**
 * Function to generate the install arma 3 steamcmd command
 * @param {boolean} beta Whether to install the beta version
 * @return {SteamCMDCommand} The steamcmd install arma 3 command
 */
export const installArma3SteamCMD = (): SteamCMDCommand => {
  return {
    command: "+app_update",
    args: ["233780", "beta"],
  };
};

/**
 * Function to generate the install mods steamcmd command
 * @param {Mod[]} mods The mods to install
 * @return {SteamCMDCommand[]} The steamcmd install mods command
 */
export const installModsSteamCMD = (mods: Mod[]): SteamCMDCommand[] => {
  return mods.map((mod) => {
    return {
      command: "+workshop_download_item",
      args: ["107410", mod.id],
    };
  });
};

/**
 * Function to generate the validate steamcmd command
 * @return {SteamCMDCommand} The steamcmd validate command
 */
export const validateSteamCMD = (): SteamCMDCommand => {
  return {
    command: "validate",
    args: ["+quit"],
  };
};

/**
 * Function to check if server is updated
 */
export const isServerUpdated = async (): Promise<boolean> => {
  const file = await getServerFileLastModified();
  const web = await getServerLastUpdate();

  if (file && web) {
    return file >= web;
  }

  return false;
};

/**
 *
 * @param {Mod} mod The mod to check
 * @returns
 */
export const isModUpdated = async (mod: Mod): Promise<boolean> => {
  const file = await getModFileLastModified(mod);
  const web = await getModLastUpdate(mod);

  if (file && web) {
    return file >= web;
  }

  return false;
};

/**
 * Function to get server file last modified date
 * @return {DateTime} The last modified date of the server
 */
const getServerFileLastModified = async (): Promise<DateTime> => {
  try {
    const stats = await statSync("/arma3/arma3server_x64");
    return DateTime.fromMillis(stats.mtimeMs);
  } catch (error) {
    if (error instanceof Error)
      logWarn(
        "Can't get Arma3 Server version, this is normal if the server is not installed -> ",
        error.message
      );
    return DateTime.fromMillis(0);
  }
};

/**
 * Function to get the latest update date of Arma 3 server
 * @return {DateTime} The last update date of the server
 */
const getServerLastUpdate = async () => {
  const res = await axios.get("https://api.steamcmd.net/v1/info/233780");
  const timeUpdated = DateTime.fromMillis(
    res.data.data["233780"]["depots"]["branches"]["public"]["timeupdated"] *
      1000
  );
  return timeUpdated;
};

/**
 * Function to get the latest update date of mod file
 * @param {Mod} mod The mod to check
 * @return {DateTime} The last update date of the mod
 */
const getModFileLastModified = async (mod: Mod): Promise<DateTime> => {
  try {
    const stats = await statSync(`/arma3/@${mod.name}/mod.cpp`);
    return DateTime.fromMillis(stats.mtimeMs);
  } catch (error) {
    if (error instanceof Error) logError(error.message);
    return DateTime.now();
  }
};

/**
 * Function to get the latest update date of a mod
 * @param {Mod} mod The mod to check
 * @return {DateTime} The last update date of the mod
 */
const getModLastUpdate = async (mod: Mod) => {
  const res = await axios.get(
    `https://steamcommunity.com/sharedfiles/filedetails/?id=${mod.id}`
  );
  const updateText: string = res.data
    .split("detailsStatRight")[3]
    .split(">")[1]
    .split("<")[0]
    .replace("@", "")
    .replace("  ", " ");
  if (!updateText.includes(",")) {
    const date = DateTime.fromFormat(updateText, "dd MMM h:mma", {
      zone: "UTC-9",
    });
    return date;
  } else {
    const date = DateTime.fromFormat(updateText, "dd MMM, yyyy h:mma", {
      zone: "UTC-9",
    });
    return date;
  }
};
