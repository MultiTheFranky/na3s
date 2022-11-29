import joi from "joi";
import { Schema, model } from "mongoose";
import { User } from "shared";

export const userSchema: joi.ObjectSchema<User> = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  admin: joi.boolean().required(),
  createdAt: joi.date().required(),
  updatedAt: joi.date().required(),
});

export const loginUserSchema: joi.ObjectSchema<User> = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

export const getUserSchema: joi.ObjectSchema<User> = joi.object({
  email: joi.string().email().required(),
});

export const registerUserSchema: joi.ObjectSchema<User> = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  admin: joi.boolean().required(),
});

export const updateUserSchema: joi.ObjectSchema<User> = joi.object({
  oldUser: userSchema.required(),
  newUser: userSchema.required(),
});

export const deleteUserSchema: joi.ObjectSchema<User> = joi.object({
  email: joi.string().email().required(),
});

export const dbUserSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});

export const userModel = model<typeof dbUserSchema>("User", dbUserSchema);
