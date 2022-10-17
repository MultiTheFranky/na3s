// API Router
import * as express from "express";

import { router as arma3serverRouter } from "./components/arma3server/arma3server.router";

export const router = express.Router();

router.use("/arma3server", arma3serverRouter);
