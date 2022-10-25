// Express API
import express from "express";

import { initSystemDb } from "../db/components/system";
import { initUserSystem } from "../db/components/user";
import { loadEnvironmentVariables } from "../env";
import { logInfo } from "../logger";
import { router as apiRouter } from "./api.router";
import { initSwagger } from "./swagger";
import { ServerEnvironment } from "./types";

/**
 * Function to initialize the express API
 */
export const initApi = async () => {
  const router = express.Router();

  router.use("/api", apiRouter);

  const app = express();

  app.use(express.json());

  app.use(router);

  await initSwagger(app);

  // Init system db
  await initSystemDb();

  // Init User system
  await initUserSystem();

  const { SERVER_PORT } = await loadEnvironmentVariables<ServerEnvironment>();

  app.listen(SERVER_PORT, () => {
    logInfo("🚀 Server is running on port 8000 🚀");
  });
};
