import { exec } from "child_process";
import { writeFileSync } from "fs";

import { Arma3Server } from "shared";

import { updateArma3Server } from "../../../db/components/arma3/server";
import { getDebug, getIsSteamCMDRunning } from "../../../db/components/system";
import { logDebug, logError, logInfo } from "../../../logger";

/**
 * Function to start a server
 * @param {Arma3Server} server
 * @return {Promise<boolean>} If the server started
 */
export const startServer = async (server: Arma3Server) => {
  if (server.isOn) {
    logError("Server is already on");
    return false;
  }
  if (await getIsSteamCMDRunning()) {
    logError("SteamCMD is running");
    return false;
  }

  await writeConfig(server);

  const { stdout, stderr, pid } = await exec(
    `/arma3/arma3server_x64 ${buildArgsString(server)}`
  );

  if (stdout)
    stdout?.on("data", (data) => {
      logInfo(data);
    });

  if (stderr)
    stderr?.on("data", (data) => {
      logError(data);
    });

  server.isOn = true;
  await updateArma3Server(server.id, server);
  if (pid) {
    server.serverPID = pid;
  } else {
    const { stdout } = exec("pgrep -f arma3server_x64");
    if (stdout) {
      stdout.on("data", (data) => {
        server.serverPID = data;
      });
    }
  }

  if (await getDebug()) {
    logDebug(
      `Started server with PID: ${
        server.serverPID
      } with args: ${buildArgsString(server)}`
    );
  }

  logInfo(
    `Server started with PID: ${server.serverPID} on port ${server.parameters.port}`
  );

  return true;
};

/**
 * Function to stop a server
 * @param {Arma3Server} server
 * @return {Promise<boolean>} If the server stopped
 */
export const stopServer = async (server: Arma3Server) => {
  if (!server.isOn) {
    logError("Server is already off");
    return false;
  }

  const { stdout, stderr } = await exec(`kill ${server.serverPID}`);

  if (stdout)
    stdout?.on("data", (data) => {
      logInfo(data);
    });

  if (stderr)
    stderr?.on("data", (data) => {
      logError(data);
    });

  server.isOn = false;
  server.serverPID = undefined;
  await updateArma3Server(server.id, server);

  logInfo(`Server stopped with PID: ${server.serverPID}`);

  return true;
};

/**
 * Function to build the args string
 * @param {Arma3Server} server The server to build the args string for
 * @return {string} The args string
 */
const buildArgsString = (server: Arma3Server) => {
  let argsString = "";
  // Add all the available parameters
  argsString += `-port=${server.parameters.port} `;

  argsString += `-cfg=/arma3/configs/${clearText(
    server.serverSettings.hostname
  )}/${clearText(server.parameters.basicConfig)}.cfg `;

  argsString += `-config=/arma3/configs/${clearText(
    server.serverSettings.hostname
  )}/${clearText(server.parameters.config)}.cfg `;

  if (server.parameters.ranking) {
    argsString += `-ranking=${server.parameters.ranking} `;
  }

  if (server.parameters.netLog) {
    argsString += `-netlog `;
  }

  if (server.parameters.profiles) {
    argsString += `-profiles=${server.parameters.profiles} `;
  }

  if (server.parameters.loadMissionToMemory) {
    argsString += `-loadMissionToMemory `;
  }

  if (server.parameters.disableServerThread) {
    argsString += `-disableServerThread `;
  }

  if (server.parameters.bandwidthAlg) {
    argsString += `-bandwidthAlg=${server.parameters.bandwidthAlg} `;
  }

  if (server.parameters.limitFPS) {
    argsString += `-limitFPS=${server.parameters.limitFPS} `;
  }

  if (server.mods) {
    argsString += `-mod=${server.mods.map((mod) => mod.path).join(";")} `;
  }

  if (server.serverMods) {
    argsString += `-serverMod=${server.serverMods
      .map((mod) => mod.path)
      .join(";")} `;
  }

  return argsString;
};

/**
 * Main function to write the server configs
 * @param {Arma3Server} server The server to get the config to write it to the files
 * @return {Promise<void>}
 */
export const writeConfig = async (server: Arma3Server) => {
  // Write the basic config file
  await writeBasicConfig(server);
  // Write the config file
  await writeConfigFile(server);
};

/**
 * Function to write the basic config file
 * @param {Arma3Server} server The server to get the basic config to write it to the file
 * @return {Promise<void>}
 */
const writeBasicConfig = async (server: Arma3Server) => {
  let basicConfig = "";
  // Add all the available parameters
  basicConfig += `MaxMsgSend=${server.basicServerSettings.MaxMsgSend};\n`;
  basicConfig += `MaxSizeGuaranteed=${server.basicServerSettings.MaxSizeGuaranteed};\n`;
  basicConfig += `MaxSizeNonguaranteed=${server.basicServerSettings.MaxSizeNonguaranteed};\n`;
  basicConfig += `MinBandwidth=${server.basicServerSettings.MinBandwidth};\n`;
  basicConfig += `MaxBandwidth=${server.basicServerSettings.MaxBandwidth};\n`;
  basicConfig += `MinErrorToSend=${server.basicServerSettings.MinErrorToSend};\n`;
  basicConfig += `MinErrorToSendNear=${server.basicServerSettings.MinErrorToSendNear};\n`;
  basicConfig += `class sockets\n{\n\tmaxPacketSize=${server.basicServerSettings.MaxPacketSize}\n};\n`;
  basicConfig += `MaxCustomFileSize=${server.basicServerSettings.MaxCustomFileSize};\n`;
  // Write the basic config file
  await writeFileSync(
    `/arma3/configs/${clearText(server.serverSettings.hostname)}/${clearText(
      server.parameters.basicConfig
    )}.cfg`,
    basicConfig
  );
};

/**
 * Function to write the config file
 * @param {Arma3Server} server The server to get the config to write it to the file
 * @return {Promise<void>}
 */
const writeConfigFile = async (server: Arma3Server) => {
  let configFile = "";
  // Add all the available parameters
  configFile += `hostname="${server.serverSettings.hostname}";\n`;
  configFile += `password="${server.serverSettings.password}";\n`;
  configFile += `passwordAdmin="${server.serverSettings.passwordAdmin}";\n`;
  configFile += `serverCommandPassword="${server.serverSettings.serverCommandPassword}";\n`;
  configFile += `maxPlayers=${server.serverSettings.maxPlayers};\n`;
  if (server.serverSettings.motd !== undefined)
    configFile += `motd[]={${server.serverSettings.motd
      .map((motd) => `"${motd}"`)
      .join(",")}};\n`;
  if (server.serverSettings.admins !== undefined)
    configFile += `admins[]={${server.serverSettings.admins
      .map((admin) => `"${admin}"`)
      .join(",")}};\n`;
  if (server.serverSettings.headlessClients !== undefined)
    configFile += `headlessClients[]={${server.serverSettings.headlessClients
      .map((headlessClient) => `"${headlessClient}"`)
      .join(",")}};\n`;
  if (server.serverSettings.localClient !== undefined)
    configFile += `localClient[]={${server.serverSettings.localClient
      .map((localClient) => `"${localClient}"`)
      .join(",")}};\n`;
  if (server.serverSettings.filePatchingExceptions !== undefined)
    configFile += `filePatchingExceptions[]={${server.serverSettings.filePatchingExceptions
      .map((filePatchingException) => `"${filePatchingException}"`)
      .join(",")}};\n`;
  if (server.serverSettings.voteThreshold !== undefined)
    configFile += `voteThreshold=${server.serverSettings.voteThreshold};\n`;
  if (server.serverSettings.voteMissionPlayers !== undefined)
    configFile += `voteMissionPlayers=${server.serverSettings.voteMissionPlayers};\n`;
  if (server.serverSettings.allowedVoteCmds !== undefined)
    configFile += `allowedVoteCmds[]={${server.serverSettings.allowedVoteCmds
      .map(
        (allowedVoteCmd) =>
          `{"${allowedVoteCmd.commandName}"
          ${
            allowedVoteCmd.preMissionStart !== undefined
              ? `,${allowedVoteCmd.preMissionStart}`
              : "true"
          }
        ${
          allowedVoteCmd.postMissionStart !== undefined
            ? `,${allowedVoteCmd.postMissionStart}`
            : "true"
        }
        ${
          allowedVoteCmd.votingThreshold !== undefined
            ? `,${allowedVoteCmd.votingThreshold}`
            : "0.5"
        }
        ${
          allowedVoteCmd.percentSideVotingThreshold !== undefined
            ? `,${allowedVoteCmd.percentSideVotingThreshold}`
            : "0.5"
        }
        }`
      )
      .join(",")}};\n`;
  if (server.serverSettings.allowedVotedAdminCmds !== undefined)
    configFile += `allowedVotedAdminCmds[]={${server.serverSettings.allowedVotedAdminCmds
      .map(
        (allowedVotedAdminCmd) =>
          `{"${allowedVotedAdminCmd.commandName}"
          ${
            allowedVotedAdminCmd.preMissionStart !== undefined
              ? `,${allowedVotedAdminCmd.preMissionStart}`
              : "true"
          }
        ${
          allowedVotedAdminCmd.postMissionStart !== undefined
            ? `,${allowedVotedAdminCmd.postMissionStart}`
            : "true"
        }
        ${
          allowedVotedAdminCmd.votingThreshold !== undefined
            ? `,${allowedVotedAdminCmd.votingThreshold}`
            : "0.5"
        }
        ${
          allowedVotedAdminCmd.percentSideVotingThreshold !== undefined
            ? `,${allowedVotedAdminCmd.percentSideVotingThreshold}`
            : "0.5"
        }
        }`
      )
      .join(",")}};\n`;
  if (server.serverSettings.kickDuplicate !== undefined)
    configFile += `kickDuplicate=${server.serverSettings.kickDuplicate};\n`;
  if (server.serverSettings.loopback !== undefined)
    configFile += `loopback=${server.serverSettings.loopback};\n`;
  if (server.serverSettings.upnp !== undefined)
    configFile += `upnp=${server.serverSettings.upnp};\n`;
  if (server.serverSettings.allowedFilePatching !== undefined)
    configFile += `allowedFilePatching=${server.serverSettings.allowedFilePatching};\n`;
  if (server.serverSettings.allowedLoadFileExtensions !== undefined)
    configFile += `allowedLoadFileExtensions[]={${server.serverSettings.allowedLoadFileExtensions
      .map((allowedLoadFileExtension) => `"${allowedLoadFileExtension}"`)
      .join(",")}};\n`;
  if (server.serverSettings.allowedPreprocessFileExtensions !== undefined)
    configFile += `allowedPreprocessFileExtensions[]={${server.serverSettings.allowedPreprocessFileExtensions
      .map(
        (allowedPreprocessFileExtension) =>
          `"${allowedPreprocessFileExtension}"`
      )
      .join(",")}};\n`;
  if (server.serverSettings.allowedHTMLLoadExtensions !== undefined)
    configFile += `allowedHTMLLoadExtensions[]={${server.serverSettings.allowedHTMLLoadExtensions
      .map((allowedHTMLLoadExtension) => `"${allowedHTMLLoadExtension}"`)
      .join(",")}};\n`;
  if (server.serverSettings.allowedHTMLLoadURIs !== undefined)
    configFile += `allowedHTMLLoadURIs[]={${server.serverSettings.allowedHTMLLoadURIs
      .map((allowedHTMLLoadURI) => `"${allowedHTMLLoadURI}"`)
      .join(",")}};\n`;
  if (server.serverSettings.disconnectTimeout !== undefined)
    configFile += `disconnectTimeout=${server.serverSettings.disconnectTimeout};\n`;
  if (server.serverSettings.maxDesync !== undefined)
    configFile += `maxdesync=${server.serverSettings.maxDesync};\n`;
  if (server.serverSettings.maxPing !== undefined)
    configFile += `maxping=${server.serverSettings.maxPing};\n`;
  if (server.serverSettings.maxPacketLoss !== undefined)
    configFile += `maxpacketloss=${server.serverSettings.maxPacketLoss};\n`;
  if (server.serverSettings.kickClientsOnSlowNetwork !== undefined)
    configFile += `kickClientsOnSlowNetwork[]={${server.serverSettings.kickClientsOnSlowNetwork
      .map((kickClientsOnSlowNetwork) => `"${kickClientsOnSlowNetwork}"`)
      .join(",")}};\n`;
  if (server.serverSettings.enablePlayerDiag !== undefined)
    configFile += `enablePlayerDiag=${server.serverSettings.enablePlayerDiag};\n`;
  if (server.serverSettings.callExtReportLimit !== undefined)
    configFile += `callExtReportLimit=${server.serverSettings.callExtReportLimit};\n`;
  if (server.serverSettings.kickTimeout !== undefined)
    configFile += `kickTimeout[]={${server.serverSettings.kickTimeout
      .map(
        (kickTimeout) =>
          `{${kickTimeout.map((kickTimeout) => kickTimeout).join(",")}}`
      )
      .join(",")}};\n`;
  if (server.serverSettings.votingTimeout !== undefined)
    if (typeof server.serverSettings.votingTimeout === "number")
      configFile += `votingTimeOut=${server.serverSettings.votingTimeout};\n`;
    else
      configFile += `votingTimeOut[]={${server.serverSettings.votingTimeout
        .map((kickClientsOnSlowNetwork) => `${kickClientsOnSlowNetwork}`)
        .join(",")}};\n`;
  if (server.serverSettings.roleTimeout !== undefined)
    if (typeof server.serverSettings.roleTimeout === "number")
      configFile += `roleTimeOut=${server.serverSettings.roleTimeout};\n`;
    else
      configFile += `roleTimeOut[]={${server.serverSettings.roleTimeout
        .map((roleTimeout) => `${roleTimeout}`)
        .join(",")}};\n`;
  if (server.serverSettings.briefingTimeout !== undefined)
    if (typeof server.serverSettings.briefingTimeout === "number")
      configFile += `briefingTimeOut=${server.serverSettings.briefingTimeout};\n`;
    else
      configFile += `briefingTimeOut[]={${server.serverSettings.briefingTimeout
        .map((briefingTimeout) => `${briefingTimeout}`)
        .join(",")}};\n`;
  if (server.serverSettings.debriefingTimeout !== undefined)
    if (typeof server.serverSettings.debriefingTimeout === "number")
      configFile += `debriefingTimeOut=${server.serverSettings.debriefingTimeout};\n`;
    else
      configFile += `debriefingTimeOut[]={${server.serverSettings.debriefingTimeout
        .map((debriefingTimeout) => `${debriefingTimeout}`)
        .join(",")}};\n`;
  if (server.serverSettings.lobbyIdleTimeout !== undefined)
    configFile += `lobbyIdleTimeout=${server.serverSettings.lobbyIdleTimeout};\n`;
  if (server.serverSettings.missionsToServerRestart !== undefined)
    configFile += `missionsToServerRestart=${server.serverSettings.missionsToServerRestart};\n`;
  if (server.serverSettings.missionsToShutdown !== undefined)
    configFile += `missionsToShutdown=${server.serverSettings.missionsToShutdown};\n`;
  if (server.serverSettings.autoSelectMission !== undefined)
    configFile += `autoSelectMission=${server.serverSettings.autoSelectMission};\n`;
  if (server.serverSettings.randomMissionOrder !== undefined)
    configFile += `randomMissionOrder=${server.serverSettings.randomMissionOrder};\n`;
  if (server.serverSettings.disableChannels !== undefined)
    configFile += `disableChannels[]={${server.serverSettings.disableChannels
      .map(
        (disableChannel) => `{"${disableChannel.channelId}"
          ${
            disableChannel.text !== undefined
              ? `,${disableChannel.text}`
              : "true"
          }
        ${
          disableChannel.voice !== undefined
            ? `,${disableChannel.voice}`
            : "true"
        }
        }`
      )
      .join(",")}};\n`;
  if (server.serverSettings.verifySignatures !== undefined)
    configFile += `verifySignatures=${server.serverSettings.verifySignatures};\n`;
  if (server.serverSettings.drawingInMap !== undefined)
    configFile += `drawingInMap=${server.serverSettings.drawingInMap};\n`;
  if (server.serverSettings.disableVoN !== undefined)
    configFile += `disableVoN=${server.serverSettings.disableVoN};\n`;
  if (server.serverSettings.vonCodecQuality !== undefined)
    configFile += `vonCodecQuality=${server.serverSettings.vonCodecQuality};\n`;
  if (server.serverSettings.vonCodec !== undefined)
    configFile += `vonCodec=${server.serverSettings.vonCodec};\n`;
  if (server.serverSettings.skipLobby !== undefined)
    configFile += `skipLobby=${server.serverSettings.skipLobby};\n`;
  if (server.serverSettings.allowProfileGlasses !== undefined)
    configFile += `allowProfileGlasses=${server.serverSettings.allowProfileGlasses};\n`;
  if (server.serverSettings.zeusCompositionScriptLevel !== undefined)
    configFile += `zeusCompositionScriptLevel=${server.serverSettings.zeusCompositionScriptLevel};\n`;
  if (server.serverSettings.logFile !== undefined)
    configFile += `logFile="${server.serverSettings.logFile}";\n`;
  if (server.serverSettings.doubleIdDetected !== undefined)
    configFile += `doubleIdDetected="${server.serverSettings.doubleIdDetected}";\n`;
  if (server.serverSettings.onUserConnected !== undefined)
    configFile += `onUserConnected="${server.serverSettings.onUserConnected}";\n`;
  if (server.serverSettings.onUserDisconnected !== undefined)
    configFile += `onUserDisconnected="${server.serverSettings.onUserDisconnected}";\n`;
  if (server.serverSettings.onHackedData !== undefined)
    configFile += `onHackedData="${server.serverSettings.onHackedData}";\n`;
  if (server.serverSettings.onDifferentData !== undefined)
    configFile += `onDifferentData="${server.serverSettings.onDifferentData}";\n`;
  if (server.serverSettings.onUnsignedData !== undefined)
    configFile += `onUnsignedData="${server.serverSettings.onUnsignedData}";\n`;
  if (server.serverSettings.onUserKick !== undefined)
    configFile += `onUserKicked="${server.serverSettings.onUserKick}";\n`;
  if (server.serverSettings.regularCheck !== undefined)
    configFile += `regularCheck=${server.serverSettings.regularCheck};\n`;
  if (server.serverSettings.battlEye !== undefined)
    configFile += `battlEye=${server.serverSettings.battlEye};\n`;
  if (server.serverSettings.timeStampFormat !== undefined)
    configFile += `timeStampFormat="${server.serverSettings.timeStampFormat}";\n`;
  if (server.serverSettings.forceRotorLibSimulation !== undefined)
    configFile += `forceRotorLibSimulation=${server.serverSettings.forceRotorLibSimulation};\n`;
  if (server.serverSettings.persistent !== undefined)
    configFile += `persistent=${server.serverSettings.persistent};\n`;
  if (server.serverSettings.requiredBuild !== undefined)
    configFile += `requiredBuild=${server.serverSettings.requiredBuild};\n`;
  if (server.serverSettings.statisticsEnabled !== undefined)
    configFile += `statisticsEnabled=${server.serverSettings.statisticsEnabled};\n`;
  if (server.serverSettings.forceDifficulty !== undefined)
    configFile += `forcedDifficulty="${server.serverSettings.forceDifficulty}";\n`;
  if (server.serverSettings.missionWhitelist !== undefined)
    configFile += `missionWhitelist[]={${server.serverSettings.missionWhitelist
      .map((missionWhitelist) => `"${missionWhitelist}"`)
      .join(",")}};\n`;
  if (server.serverSettings.steamProtocolMaxPacketSize !== undefined)
    configFile += `steamProtocolMaxDataSize=${server.serverSettings.steamProtocolMaxPacketSize};\n`;
  configFile += "class AdvancedOptions\n{\n";
  if (server.serverSettings.logObjectNotFound !== undefined)
    configFile += `LogObjectNotFound=${server.serverSettings.logObjectNotFound};\n`;
  if (server.serverSettings.skipDescriptionParsing !== undefined)
    configFile += `SkipDescriptionParsing=${server.serverSettings.skipDescriptionParsing};\n`;
  if (server.serverSettings.ignoreMissionLoadErrors !== undefined)
    configFile += `ignoreMissionLoadErrors=${server.serverSettings.ignoreMissionLoadErrors};\n`;
  if (server.serverSettings.queueSizeLogG !== undefined)
    configFile += `queueSizeLogG=${server.serverSettings.queueSizeLogG};\n`;
  configFile += "};\n";
  if (server.serverSettings.armaUnitsTimeout !== undefined)
    configFile += `armaUnitsTimeout=${server.serverSettings.armaUnitsTimeout};\n`;
  // Write the config file
  await writeFileSync(
    `/arma3/configs/${clearText(server.serverSettings.hostname)}/${clearText(
      server.parameters.config
    )}.cfg`,
    configFile
  );
};
/**
 * Function to clear the text from special characters
 * @param {string} text The text to clear
 * @return {string} The cleared text
 */
const clearText = (text: string) => {
  return text
    .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/gi, "")
    .replace(/ /g, "_")
    .toLowerCase();
};
