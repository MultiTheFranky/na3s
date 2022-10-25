import express from "express";
import { Arma3ServerConfig } from "shared";

import { startArma3Server } from ".";

const router = express.Router();

router.post("/start", async (req, res) => {
  //Get the server config from the request body
  try {
    const serverConfig = req.body as Arma3ServerConfig;
    await startArma3Server(serverConfig);
    res.status(200).send("Server started");
  } catch (error) {
    res.status(500).send(error);
  }
});

export { router };
