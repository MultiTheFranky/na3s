import { Mod } from "./Mod";

export type ServerConfig = {
  name: string;
  password: string;
  port: number;
  mods: Mod[];
};
