import bcrypt from "bcrypt";
import { User } from "shared";

import { userModel } from "./schema";

/**
 * Function to create a new user
 * @param user
 * @returns Promise<User>
 */
export const createUser = async (user: User) => {
  return await userModel.create(user);
};

/**
 * Function to get all users
 * @returns Promise<User[]>
 */
export const getAllUsers = async (): Promise<User[]> => {
  return await userModel.find({});
};

/**
 * Function to update the user by email
 * @param email
 * @param user
 * @returns Promise<User>
 */
export const updateUserByEmail = async (
  email: string,
  user: User
): Promise<User | null> => {
  return await userModel.findOneAndUpdate({ email }, user);
};

/**
 * Function to delete a user by email
 * @param email
 * @returns Promise<User>
 */
export const deleteUserByEmail = async (
  email: string
): Promise<User | null> => {
  return await userModel.findOneAndDelete({ email });
};

/**
 * Function to get a user by email
 * @param email
 * @returns Promise<User>
 */
export const getUserByEmail = async (email: string): Promise<User | null> => {
  return await userModel.findOne({ email });
};

/**
 * Function to initialize the user system
 */
export const initUserSystem = async () => {
  // Check if default admin user exists
  const adminUser = await getUserByEmail("admin@admin.com");

  // If the admin user does not exist, create it
  if (!adminUser) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("admin", salt);
    const newUser: User = {
      email: "admin@admin.com",
      password: hashedPassword,
      name: "Admin",
      admin: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await createUser(newUser);
  }
};
