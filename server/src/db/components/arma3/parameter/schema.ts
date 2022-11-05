import joi from "joi";
import { Schema } from "mongoose";
import { Arma3ServerParameters } from "shared";

export const DBArma3ParametersSchema = new Schema<Arma3ServerParameters>({
  port: {
    type: Number,
    required: true,
  },
  basicConfig: {
    type: String,
    required: true,
  },
  config: {
    type: String,
    required: true,
  },
  mods: {
    type: [String],
    required: true,
  },
  serverMods: {
    type: [String],
    required: true,
  },
  ranking: {
    type: String,
    required: false,
  },
  netLog: {
    type: Boolean,
    required: false,
  },
  profiles: {
    type: String,
    required: false,
  },
  loadMissionToMemory: {
    type: Boolean,
    required: false,
  },
  disableServerThread: {
    type: Boolean,
    required: false,
  },
  bandwidthAlg: {
    type: Number,
    required: false,
  },
  limitFPS: {
    type: Number,
    required: false,
  },
});

export const arma3ParametersSchema: joi.ObjectSchema<Arma3ServerParameters> =
  joi.object({
    port: joi.number().required(),
    basicConfig: joi.string().required(),
    config: joi.string().required(),
    mods: joi.array().items(joi.string()).required(),
    serverMods: joi.array().items(joi.string()).required(),
    ranking: joi.string().optional(),
    netLog: joi.boolean().optional(),
    profiles: joi.string().optional(),
    loadMissionToMemory: joi.boolean().optional(),
    disableServerThread: joi.boolean().optional(),
    bandwidthAlg: joi.number().optional(),
    limitFPS: joi.number().optional(),
  });
