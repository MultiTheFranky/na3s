import Mod from "./Mod";

type ServerConfig = {
  name: string;
  password: string;
  port: number;
  mods: Mod[];
};

export default ServerConfig;
