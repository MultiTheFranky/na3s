// Express API
import express from "express";

import { router as apiRouter } from "./api.router";

export const router = express.Router();

router.use("/api", apiRouter);

const app = express();

app.use(router);

app.listen(3000, () => {
  console.log("🚀 Server is running on port 8000 🚀");
});
