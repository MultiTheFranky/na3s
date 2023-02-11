import express from "express";
import { Arma3Server } from "shared";

import {
  createArma3Server,
  deleteArma3Server,
  getArma3Server,
  getArma3Servers,
  updateArma3Server,
} from "../../../db/components/arma3/server";
import { serverSchema } from "../../../db/components/arma3/server/schema";
import { logInfo } from "../../../logger/index";
import { isAdmin } from "../web/user";
import { startServer, stopServer } from "./utils";

const router = express.Router();

router.post("/start", async (req, res) => {
  try {
    const id = req.body["id"] as string;
    if (!id) {
      res.status(400).send("Missing id");
      return;
    }
    // If the user is not an admin, return a 401 status code
    if (!(await isAdmin(req.headers.authorization))) {
      return res.status(401).send("Not authorized");
    }
    const server = await getArma3Server(id);
    if (!server) {
      res.status(404).send("Server not found");
      return;
    }
    if (server.isOn) {
      res.status(400).send("Server is already on");
      return;
    }
    //Start the server
    const started = await startServer(server);
    if (started) {
      res.status(200).send("Server started");
    } else {
      res.status(500).send("Server not started");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/stop", async (req, res) => {
  try {
    const id = req.body["id"] as string;
    if (!id) {
      res.status(400).send("Missing id");
      return;
    }
    // If the user is not an admin, return a 401 status code
    if (!(await isAdmin(req.headers.authorization))) {
      return res.status(401).send("Not authorized");
    }
    const server = await getArma3Server(id);
    if (!server) {
      res.status(404).send("Server not found");
      return;
    }
    if (!server.isOn) {
      res.status(400).send("Server is already off");
      return;
    }
    //Stop the server
    const stopped = await stopServer(server);
    if (stopped) {
      res.status(200).send("Server stopped");
    } else {
      res.status(500).send("Server not stopped");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/restart", async (req, res) => {
  try {
    const id = req.body["id"] as string;
    if (!id) {
      res.status(400).send("Missing id");
      return;
    }
    // If the user is not an admin, return a 401 status code
    if (!(await isAdmin(req.headers.authorization))) {
      return res.status(401).send("Not authorized");
    }
    const server = await getArma3Server(id);
    if (!server) {
      res.status(404).send("Server not found");
      return;
    }
    //Stop the server
    const stopped = await stopServer(server);
    if (stopped) {
      //Start the server
      const started = await startServer(server);
      if (started) {
        res.status(200).send("Server restarted");
      } else {
        res.status(500).send("Server not restarted");
      }
    } else {
      res.status(500).send("Server not restarted");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { error } = serverSchema.validate(req.body);
    if (error) {
      res.status(400).send(error);
      return;
    }
    // If the user is not an admin, return a 401 status code
    if (!(await isAdmin(req.headers.authorization))) {
      return res.status(401).send("Not authorized");
    }
    if (await getArma3Server(req.body.id)) {
      res.status(400).send("Server already exists");
      return;
    }
    const server = req.body as Arma3Server;
    //Add the server
    const added = await createArma3Server(server);
    if (added) {
      res.status(200).send("Server added");
    } else {
      res.status(500).send("Server not added");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/", async (req, res) => {
  try {
    const id = req.body["id"] as string;
    if (!id) {
      res.status(400).send("Missing id");
      return;
    }
    // If the user is not an admin, return a 401 status code
    if (!(await isAdmin(req.headers.authorization))) {
      return res.status(401).send("Not authorized");
    }
    const server = await deleteArma3Server(id);
    if (!server) {
      res.status(404).send("Server not found");
      return;
    }
    if (server.isOn) {
      stopServer(server);
    }
    res.status(200).send("Server deleted");
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/", async (req, res) => {
  try {
    const { error } = serverSchema.validate(req.body);
    if (error) {
      res.status(400).send(error);
      return;
    }
    // If the user is not an admin, return a 401 status code
    if (!(await isAdmin(req.headers.authorization))) {
      return res.status(401).send("Not authorized");
    }
    const server = req.body as Arma3Server;
    if (!(await getArma3Server(server.id))) {
      res.status(404).send("Server not found");
      return;
    }
    //Update the server
    const updated = await updateArma3Server(server.id, server);
    if (updated) {
      res.status(200).send("Server updated");
    } else {
      res.status(500).send("Server not updated");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const servers = await getArma3Servers();
    res.status(200).send(servers);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params["id"] as string;
    if (!id) {
      res.status(400).send("Missing id");
      return;
    }
    const server = await getArma3Server(id);
    if (!server) {
      res.status(404).send("Server not found");
      return;
    }
    res.status(200).send(server);
  } catch (error) {
    res.status(500).send(error);
  }
});

export { router };
