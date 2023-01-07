import { VoteCommand } from "./VoteCommand";

export type ServerConfig = {
  hostname: string;
  password: string;
  passwordAdmin: string;
  serverCommandPassword: string;
  maxPlayers?: number;
  motd?: string[];
  admins?: SteamUID[];
  headlessClients?: IP[];
  localClient?: IP[];
  filePatchingExceptions?: SteamUID[];
  voteThreshold?: number;
  voteMissionPlayers?: number;
  allowedVoteCmds?: VoteCommand[];
  allowedVotedAdminCmds?: VoteCommand[];
  kickDuplicate?: boolean;
  loopback?: boolean;
  upnp?: boolean;
  allowedFilePatching?: boolean;
  allowedLoadFileExtensions?: string[];
  allowedPreprocessFileExtensions?: string[];
  allowedHTMLLoadExtensions?: string[];
  allowedHTMLLoadURIs?: string[];
  disconnectTimeout?: number;
  maxDesync?: number;
  maxPing?: number;
  maxPacketLoss?: number;
  kickClientsOnSlowNetwork?: boolean[];
  enablePlayerDiag?: boolean;
  callExtReportLimit?: number;
  kickTimeout?: number[][];
  votingTimeout?: number | number[];
  roleTimeout?: number | number[];
  briefingTimeout?: number | number[];
  debriefingTimeout?: number | number[];
  lobbyIdleTimeout?: number;
  missionsToServerRestart?: number;
  missionsToShutdown?: number;
  autoSelectMission?: boolean;
  randomMissionOrder?: boolean;
  disableChannels?: DisableChannel[];
  verifySignatures?: number;
  drawingInMap?: boolean;
  disableVoN?: boolean;
  vonCodecQuality?: number;
  vonCodec?: number;
  skipLobby?: boolean;
  allowProfileGlasses?: boolean;
  zeusCompositionScriptLevel?: number;
  logFile?: string;
  doubleIdDetected?: string;
  onUserConnected?: string;
  onUserDisconnected?: string;
  onHackedData?: string;
  onDifferentData?: string;
  onUnsignedData?: string;
  onUserKick?: string;
  regularCheck?: string;
  battlEye?: boolean;
  timeStampFormat?: "none" | "short" | "full";
  forceRotorLibSimulation?: number;
  persistent?: boolean;
  requiredBuild?: string;
  statisticsEnabled?: boolean;
  forceDifficulty?: string;
  missionWhitelist?: string[];
  steamProtocolMaxPacketSize?: number;
  logObjectNotFound?: boolean;
  skipDescriptionParsing?: boolean;
  ignoreMissionLoadErrors?: boolean;
  queueSizeLogG?: number;
  armaUnitsTimeout?: number;
};
type SteamUID = `${bigint}`;
type IP = `${bigint}.${bigint}.${bigint}.${bigint}`;
type DisableChannel = {
  channelId: ChannelId;
  text: boolean;
  voice: boolean;
};
export enum ChannelId {
  "Global",
  "Side",
  "Command",
  "Group",
  "Vehicle",
  "Direct",
  "System",
}
