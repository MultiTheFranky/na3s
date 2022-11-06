// API Router
import * as express from "express";

import { router as arma3serverRouter } from "./routes/arma3/arma3.router";
import { router as steamcmdRouter } from "./routes/steamcmd/steamcmd.router";
import { router as webRouter } from "./routes/web/web.router";

export const router = express.Router();

router.use("/arma3server", arma3serverRouter);
router.use("/web", webRouter);
router.use("/steamcmd", steamcmdRouter);
