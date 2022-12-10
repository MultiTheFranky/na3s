import express from "express";

import {
  getSystemDb,
  updateSystemDb,
} from "../../../db/components/system/index";
import { systemSchema } from "../../../db/components/system/schema";
import { isAdmin } from "../web/user";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { error } = systemSchema.validate(req.body);
    if (error) {
      res.status(400).send(error);
      return;
    }
    // If the user is not an admin, return a 401 status code
    if (!(await isAdmin(req.headers.authorization))) {
      return res.status(401).send("Not authorized");
    }
    await updateSystemDb(req.body);
    res.status(200).send("OK");
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    // If the user is not an admin, return a 401 status code
    if (!(await isAdmin(req.headers.authorization))) {
      return res.status(401).send("Not authorized");
    }
    res.status(200).send(await getSystemDb());
  } catch (error) {
    res.status(500).send(error);
  }
});

export { router };
