import cors from "cors";
// Express API
import express from "express";
import { rateLimit } from "express-rate-limit";

import { initSystemDb } from "../db/components/system";
import { initUserSystem } from "../db/components/user";
import { loadEnvironmentVariables } from "../env";
import { logInfo } from "../logger";
import { router as apiRouter } from "./api.router";
import { startAllServers } from "./routes/arma3";
import { initSteamCMDCheckerSystem } from "./routes/steamcmd";
import { initSwagger } from "./swagger";
import { ServerEnvironment } from "./types";

/**
 * Function to initialize the express API
 */
export const initApi = async () => {
  const router = express.Router();

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });

  router.use("/api", apiRouter);

  const app = express();

  // Apply the rate limiting middleware to all requests
  app.use(limiter);

  app.use(cors());

  app.use(express.json());

  app.use(router);

  await initSwagger(app);

  // Init system db
  await initSystemDb();

  // Init User system
  await initUserSystem();

  // Init steamcmd checker system
  await initSteamCMDCheckerSystem();

  // Start all servers that should be on
  await startAllServers();

  const { SERVER_PORT } = await loadEnvironmentVariables<ServerEnvironment>();

  app.listen(SERVER_PORT, () => {
    logInfo(`🚀 Server is running on port ${SERVER_PORT} 🚀`);
  });
};
