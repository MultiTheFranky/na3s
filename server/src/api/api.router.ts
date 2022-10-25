// API Router
import * as express from "express";

import { router as arma3serverRouter } from "./routes/arma3server/arma3server.router";
import { router as webRouter } from "./routes/web/web.router";

export const router = express.Router();

router.use("/arma3server", arma3serverRouter);
router.use("/web", webRouter);
