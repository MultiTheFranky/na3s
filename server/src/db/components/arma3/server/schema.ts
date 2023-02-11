import joi from "joi";
import { Schema, model } from "mongoose";
import { Arma3Server } from "shared";

import {
  DBArma3BasicServerConfigSchema,
  arma3BasicServerConfigSchema,
} from "../basicServerConfig/schema";
import { DBArma3MissionSchema, arma3MissionSchema } from "../mission/schema";
import { DBArma3ModSchema, arma3ModSchema } from "../mod/schema";
import {
  DBArma3ParametersSchema,
  arma3ParametersSchema,
} from "../parameter/schema";
import {
  DBArma3ServerConfigSchema,
  arma3ServerConfigSchema,
} from "../serverConfig/schema";

export const DBArma3ServerSchema = new Schema<Arma3Server>(
  {
    id: {
      type: String,
      required: true,
      index: true,
    },
    isOn: {
      type: Boolean,
      required: true,
    },
    parameters: {
      type: DBArma3ParametersSchema,
      required: true,
    },
    serverSettings: {
      type: DBArma3ServerConfigSchema,
      required: true,
    },
    basicServerSettings: {
      type: DBArma3BasicServerConfigSchema,
      required: true,
    },
    mods: {
      type: [DBArma3ModSchema],
      required: true,
    },
    serverMods: {
      type: [DBArma3ModSchema],
      required: true,
    },
    serverPID: {
      type: Number,
      required: false,
    },
    missions: {
      type: [DBArma3MissionSchema],
      required: true,
    },
  },
  {
    collection: "arma3Server",
    capped: {
      autoIndexId: false,
    },
  }
);

export const arma3ServerModel = model<typeof DBArma3ServerSchema>(
  "Arma3Server",
  DBArma3ServerSchema
);

export const serverSchema: joi.ObjectSchema<Arma3Server> = joi.object({
  id: joi.string().required(),
  isOn: joi.boolean().required(),
  parameters: arma3ParametersSchema.required(),
  serverSettings: arma3ServerConfigSchema.required(),
  basicServerSettings: arma3BasicServerConfigSchema.required(),
  mods: joi.array().items(arma3ModSchema).required(),
  serverMods: joi.array().items(arma3ModSchema).required(),
  serverPID: joi.number().optional(),
  missions: joi.array().items(arma3MissionSchema).required(),
});
