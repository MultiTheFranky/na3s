export type ServerParameters = {
  port: number;
  basicConfig: string;
  config: string;
  ranking?: string;
  netLog?: boolean;
  profiles?: string;
  loadMissionToMemory?: boolean;
  disableServerThread?: boolean;
  bandwidthAlg?: number;
  limitFPS?: number;
};
