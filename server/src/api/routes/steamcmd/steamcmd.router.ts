import express from "express";
import { SteamCMDCommand } from "shared";

import { runtSteamCMD } from ".";

const router = express.Router();

router.post("/run", async (req, res) => {
  //Get the server config from the request body
  try {
    const args = req.body as SteamCMDCommand[];
    await runtSteamCMD(args);
    res.status(200).send("Command ran");
  } catch (error) {
    res.status(500).send(error);
  }
});

export { router };
