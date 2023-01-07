import joi from "joi";
import { Schema } from "mongoose";
import { Arma3Mod } from "shared";

export const DBArma3ModSchema = new Schema<Arma3Mod>({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  enabled: {
    type: Boolean,
    required: true,
  },
});

export const arma3ModSchema: joi.ObjectSchema<Arma3Mod> = joi.object({
  id: joi.string().required(),
  name: joi.string().required(),
  path: joi.string().required(),
  enabled: joi.boolean().required(),
});
