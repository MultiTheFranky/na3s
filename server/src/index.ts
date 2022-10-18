import { initLogger, logInfo } from "./logger";

(async () => {
  // Init logger
  initLogger();
  logInfo("🚀 Server started 🚀");
})();
