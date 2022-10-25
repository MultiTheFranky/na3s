import express from "express";

import {
  deleteUser,
  getAllUsers,
  getUser,
  loginUser,
  registerUser,
  updateUser,
} from "./user";

const router = express.Router();

export type JWTUser = {
  user: {
    email: string;
  };
  iat: number;
  exp: number;
};

router.post("/login", async (req, res) => {
  await loginUser(req, res);
});

router.post("/register", async (req, res) => {
  await registerUser(req, res);
});

router.get("/:email", async (req, res) => {
  await getUser(req, res);
});

router.get("/", async (req, res) => {
  await getAllUsers(req, res);
});

router.put("/", async (req, res) => {
  await updateUser(req, res);
});

router.delete("/", async (req, res) => {
  await deleteUser(req, res);
});

export { router };
