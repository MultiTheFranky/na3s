import joi from "joi";
import { Schema } from "mongoose";
import { Arma3Mission } from "shared";

export const DBArma3MissionSchema = new Schema<Arma3Mission>({
  template: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
});

export const arma3MissionSchema: joi.ObjectSchema<Arma3Mission> = joi.object({
  template: joi.string().required(),
  difficulty: joi.string().required(),
});
