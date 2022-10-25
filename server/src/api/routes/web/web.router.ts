import express from "express";

import { router as UserRouter } from "./user/user.router";

const router = express.Router();

router.use("/user", UserRouter);

export { router };
