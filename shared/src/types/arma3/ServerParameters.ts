export type ServerParameters = {
  port: number;
  basicConfig: string;
  config: string;
  mods: string[];
  serverMods: string[];
  ranking?: string;
  netLog?: boolean;
  profiles?: string;
  loadMissionToMemory?: boolean;
  disableServerThread?: boolean;
  bandwidthAlg?: number;
  limitFPS?: number;
};
