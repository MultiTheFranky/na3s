// Express API
import * as express from "express";

import { router as apiRouter } from "./api.router";

export const router = express.Router();

router.use("/api", apiRouter);
