import { BasicServerConfig } from "./BasicServerConfig";
import { Mission } from "./Mission";
import { Mod } from "./Mod";
import { ServerConfig } from "./ServerConfig";
import { ServerParameters } from "./ServerParameters";

export type Server = {
  id: string;
  isOn: boolean;
  activated: boolean;
  parameters: ServerParameters;
  serverSettings: ServerConfig;
  basicServerSettings: BasicServerConfig;
  missions: Mission[];
  mods: Mod[];
  serverMods: Mod[];
  serverPID?: number;
};

export type BasicServerInfo = {
  isOn: boolean;
  name: string;
  ip: string;
  port: number;
  mission: Mission;
  players: number;
  maxPlayers: number;
};
