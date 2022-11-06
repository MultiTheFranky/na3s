import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "shared";

import { getSystemDb, updateSystemDb } from "../../../../db/components/system";
import {
  createUser,
  deleteUserByEmail,
  getAllUsers as getAllUsersFromDB,
  getUserByEmail,
  updateUserByEmail,
} from "../../../../db/components/user";
import {
  deleteUserSchema,
  getUserSchema,
  loginUserSchema,
  registerUserSchema,
  updateUserSchema,
} from "../../../../db/components/user/schema";
import { loadEnvironmentVariables } from "../../../../env";
import { logError } from "../../../../logger";
import { ServerEnvironment } from "../../../types";
import { JWTUser } from "./user.router";

/**
 * Function to know if  the user is an admin using the token
 * @param token
 * @returns Promise<boolean>
 */
export const isAdmin = async (token?: string): Promise<boolean> => {
  if (!token) {
    return false;
  }
  // Remove the Bearer from the token
  const tokenWithoutBearer = token.split(" ")[1];
  const { JWT_SECRET } = await loadEnvironmentVariables<ServerEnvironment>();
  const { user, exp } = jwt.verify(tokenWithoutBearer, JWT_SECRET) as JWTUser;
  // Check expiration
  if (exp < Date.now().valueOf() / 1000) {
    return false;
  }
  // Check if the user is an admin
  const checkUser = await getUserByEmail(user.email);
  return checkUser?.admin || false;
};

/**
 * Function to login a user
 * @param {Request} req Request
 * @param {Response} res Response
 * @returns {Promise<void>}
 */
export const loginUser = async (req: Request, res: Response) => {
  try {
    // Validate the request body
    const { error } = loginUserSchema.validate(req.body);

    // If there is an error, return a 400 status code
    if (error) {
      return res.status(400).send(error.message);
    }

    // Get the email and password from the request body
    const { email, password } = req.body;

    // Get the user from the database
    const user = await getUserByEmail(email);

    // If the user does not exist, return a 404 status code
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Compare the password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    // If the password does not match, return a 400 status code
    if (!isMatch) {
      return res.status(400).send("Invalid credentials");
    }

    // Creates the payload for the JWT
    const payload = {
      user: {
        email: user.email,
      },
    };

    // Get the JWT secret from the environment variables
    const { JWT_SECRET } = await loadEnvironmentVariables<ServerEnvironment>();

    // Sign the JWT token and send it to the client
    jwt.sign(
      payload,
      JWT_SECRET,
      {
        expiresIn: "7d",
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    if (err instanceof Error) {
      logError(err.message);
      res.status(500).send("Server error");
      return;
    }
    res.status(500).send("Server error");
  }
};

/**
 * Function to get the logged in user
 * @param {Request} req Request
 * @param {Response} res Response
 * @returns {Promise<void>}
 */
export const getUser = async (req: Request, res: Response) => {
  try {
    // Validate the request body
    const { error } = getUserSchema.validate(req.params);

    // If there is an error, return a 400 status code
    if (error) {
      return res.status(400).send(error.message);
    }

    // If the user is not an admin, return a 401 status code
    if (!(await isAdmin(req.headers.authorization))) {
      return res.status(401).send("Not authorized");
    }

    // Get the email from the request body
    const { email } = req.params;

    // Get the user from the database
    const user = await getUserByEmail(email);

    // If the user does not exist, return a 404 status code
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Return the user
    res.json(user);
  } catch (err) {
    if (err instanceof Error) {
      logError(err.message);
      res.status(500).send("Server error");
      return;
    }
    res.status(500).send("Server error");
  }
};

/**
 * Get all users
 * @param {Request} req Request
 * @param {Response} res Response
 * @returns {Promise<void>}
 */
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    // If the user is not an admin, return a 401 status code
    if (!(await isAdmin(req.headers.authorization))) {
      return res.status(401).send("Not authorized");
    }

    // Get all users from the database
    const users = await getAllUsersFromDB();

    // Return the users
    res.json(users);
  } catch (err) {
    if (err instanceof Error) {
      logError(err.message);
      res.status(500).send("Server error");
      return;
    }
    res.status(500).send("Server error");
  }
};

/**
 * Function to register a user
 * @param {Request} req Request
 * @param {Response} res Response
 * @returns {Promise<void>}
 */
export const registerUser = async (req: Request, res: Response) => {
  try {
    // Validate the request body
    const { error } = registerUserSchema.validate(req.body);

    // If there is an error, return a 400 status code
    if (error) {
      return res.status(400).send(error.message);
    }

    // If the user is not an admin, return a 401 status code
    if (!(await isAdmin(req.headers.authorization))) {
      return res.status(401).send("Not authorized");
    }

    // Get the email, password, name and admin from the request body
    const { email, password, name, admin } = req.body;

    // Get the user from the database
    const user = await getUserByEmail(email);

    // If the user exists, return a 400 status code
    if (user) {
      return res.status(400).send("User already exists");
    }

    // Create a new user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser: User = {
      email,
      password: hashedPassword,
      name,
      admin,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await createUser(newUser);

    // Creates the payload for the JWT
    const payload = {
      user: {
        email: newUser.email,
      },
    };

    // Get the JWT secret from the environment variables
    const { JWT_SECRET } = await loadEnvironmentVariables<ServerEnvironment>();

    // Sign the JWT token and send it to the client
    jwt.sign(
      payload,
      JWT_SECRET,
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    if (err instanceof Error) {
      logError(err.message);
      res.status(500).send("Server error");
      return;
    }
    res.status(500).send("Server error");
  }
};

/**
 * Function to update a user
 * @param {Request} req Request
 * @param {Response} res Response
 * @returns {Promise<void>}
 */
export const updateUser = async (req: Request, res: Response) => {
  try {
    // Validate the request body
    const { error } = updateUserSchema.validate(req.body);

    // If there is an error, return a 400 status code
    if (error) {
      return res.status(400).send(error.message);
    }

    // If the user is not an admin, return a 401 status code
    if (!(await isAdmin(req.headers.authorization))) {
      return res.status(401).send("Not authorized");
    }

    // Get the oldUser and the newUser from the request body
    const { oldUser, newUser }: { oldUser: User; newUser: User } = req.body;
    // Check if the old user exists and the new user does not exist
    const oldUserExists = await getUserByEmail(oldUser.email);
    if (!oldUserExists) {
      return res.status(404).send("The old user does not exist");
    }

    // Update the user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newUser.password, salt);
    const updatedUser: User = {
      ...newUser,
      password: hashedPassword,
      updatedAt: new Date(),
    };
    await updateUserByEmail(newUser.email, updatedUser);

    const system = await getSystemDb();

    // If oldUser is admin and firstExecution is true, set firstExecution to false
    if (
      oldUser.email === "admin@admin.com" &&
      system &&
      system.firstExecution
    ) {
      await updateSystemDb({ ...system, firstExecution: false });
    }

    // If the oldUser email is different from the newUser email, delete the oldUser
    if (oldUser.email !== newUser.email) {
      await deleteUserByEmail(oldUser.email);
    }

    // Return the updated user JWT token
    const payload = {
      user: {
        email: newUser.email,
      },
    };
    const { JWT_SECRET } = await loadEnvironmentVariables<ServerEnvironment>();
    jwt.sign(
      payload,
      JWT_SECRET,
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    if (err instanceof Error) {
      logError(err.message);
      res.status(500).send("Server error");
      return;
    }
    res.status(500).send("Server error");
  }
};

/**
 * Function to delete a user
 * @param {Request} req Request
 * @param {Response} res Response
 * @returns {Promise<void>}
 */
export const deleteUser = async (req: Request, res: Response) => {
  try {
    // Validate the request body
    const { error } = deleteUserSchema.validate(req.body);

    // If there is an error, return a 400 status code
    if (error) {
      return res.status(400).send(error.message);
    }

    // If the user is not an admin, return a 401 status code
    if (!(await isAdmin(req.headers.authorization))) {
      return res.status(401).send("Not authorized");
    }

    // Get the email from the request body
    const { email } = req.body;

    // Get the user from the database
    const user = await getUserByEmail(email);

    // If the user does not exist, return a 404 status code
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Delete the user
    await deleteUserByEmail(email);
    res.send("User deleted");
  } catch (err) {
    if (err instanceof Error) {
      logError(err.message);
      res.status(500).send("Server error");
      return;
    }
    res.status(500).send("Server error");
  }
};
