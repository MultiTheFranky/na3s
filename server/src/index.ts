import { initApi } from "./api";
import { initDb } from "./db";
import { logInfo } from "./logger";

(async () => {
  // Init DB
  const connected = await initDb();
  if (!connected) {
    logInfo("❌ Database is not connected. Closing application ❌");
    return;
  }
  // Init API
  await initApi();
})();
