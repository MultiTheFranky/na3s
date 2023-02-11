import { getArma3Servers } from "../../../db/components/arma3/server";
import { startServer } from "./utils";

/**
 * Function to start all servers that should be on
 */
export const startAllServers = async () => {
  const servers = await getArma3Servers();
  servers.forEach(async (server) => {
    if (!server.isOn && server.activated) {
      await startServer(server);
    }
  });
};
