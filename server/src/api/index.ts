// Express API
import express from "express";

import { loadEnvironmentVariables } from "../env";
import { router as apiRouter } from "./api.router";
import { ServerEnvironment } from "./types";

(async () => {
  const router = express.Router();

  router.use("/api", apiRouter);

  const app = express();

  app.use(router);

  const { SERVER_PORT } = await loadEnvironmentVariables<ServerEnvironment>();

  app.listen(SERVER_PORT, () => {
    console.log("🚀 Server is running on port 8000 🚀");
  });
})();
