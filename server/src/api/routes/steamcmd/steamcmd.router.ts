import express from "express";

import {
  createSteamCMDUser,
  deleteSteamCMDUser,
  getSteamCMDUser,
  updateSteamCMDUser,
} from "../../../db/components/steamcmd/user";
import { steamCMDUserSchema } from "../../../db/components/steamcmd/user/schema";
import { isAdmin } from "../web/user";
import { mainSteamCMD } from "./utils";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // If the user is not an admin, return a 401 status code
    if (!(await isAdmin(req.headers.authorization))) {
      return res.status(401).send("Not authorized");
    }
    // get the steamcmd user
    const user = await getSteamCMDUser();
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    // Validate the request body
    const { error } = steamCMDUserSchema.validate(req.body);
    if (error) {
      res.status(400).send(error);
      return;
    }
    // If the user is not an admin, return a 401 status code
    if (!(await isAdmin(req.headers.authorization))) {
      return res.status(401).send("Not authorized");
    }
    // Create the steamcmd user
    createSteamCMDUser(req.body);
    res.status(200).send("User created");
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/", async (req, res) => {
  try {
    // Validate the request body
    const { error } = steamCMDUserSchema.validate(req.body);
    if (error) {
      res.status(400).send(error);
      return;
    }
    // If the user is not an admin, return a 401 status code
    if (!(await isAdmin(req.headers.authorization))) {
      return res.status(401).send("Not authorized");
    }
    // Update the steamcmd user
    const updated = await updateSteamCMDUser(req.body);
    if (updated) {
      res.status(200).send("User updated");
    } else {
      res.status(500).send("User not updated");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/", async (req, res) => {
  try {
    // Validate the request body
    const { error } = steamCMDUserSchema.validate(req.body);
    if (error) {
      res.status(400).send(error);
      return;
    }
    // If the user is not an admin, return a 401 status code
    if (!(await isAdmin(req.headers.authorization))) {
      return res.status(401).send("Not authorized");
    }
    // Delete the steamcmd user
    const deleted = await deleteSteamCMDUser(req.body);
    if (deleted) {
      res.status(200).send("User deleted");
    } else {
      res.status(500).send("User not deleted");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/update", async (req, res) => {
  try {
    // If the user is not an admin, return a 401 status code
    if (!(await isAdmin(req.headers.authorization))) {
      return res.status(401).send("Not authorized");
    }
    await mainSteamCMD();
    res.status(200).send("Server and mods updated");
  } catch (error) {
    res.status(500).send(error);
  }
});

export { router };
