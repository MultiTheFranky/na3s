import { initApi } from "./api";
import { ws } from "./api/websocket";
import { initDb } from "./db";
import { logInfo } from "./logger";

(async () => {
  // Init websocket server
  await ws();
  // Init DB
  const connected = await initDb();
  if (!connected) {
    logInfo("❌ Database is not connected. Closing application ❌");
    return;
  }
  // Init API
  await initApi();
})();
