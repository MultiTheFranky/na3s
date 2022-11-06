import joi from "joi";
import { Schema } from "mongoose";
import { Arma3BasicServerConfig } from "shared";

export const DBArma3BasicServerConfigSchema =
  new Schema<Arma3BasicServerConfig>({
    MaxMsgSend: {
      type: Number,
      required: false,
      default: 128,
    },
    MaxSizeGuaranteed: {
      type: Number,
      required: false,
      default: 512,
    },
    MaxSizeNonguaranteed: {
      type: Number,
      required: false,
      default: 256,
    },
    MinBandwidth: {
      type: Number,
      required: false,
      default: 131072,
    },
    MaxBandwidth: {
      type: Number,
      required: false,
      default: 1048576,
    },
    MinErrorToSend: {
      type: Number,
      required: false,
      default: 0.001,
    },
    MinErrorToSendNear: {
      type: Number,
      required: false,
      default: 0.01,
    },
    MaxPacketSize: {
      type: Number,
      required: false,
      default: 1400,
    },
    MaxCustomFileSize: {
      type: Number,
      required: false,
      default: 1024,
    },
  });

export const arma3BasicServerConfigSchema: joi.ObjectSchema<Arma3BasicServerConfig> =
  joi.object({
    MaxMsgSend: joi.number().required(),
    MaxSizeGuaranteed: joi.number().required(),
    MaxSizeNonguaranteed: joi.number().required(),
    MinBandwidth: joi.number().required(),
    MaxBandwidth: joi.number().required(),
    MinErrorToSend: joi.number().required(),
    MinErrorToSendNear: joi.number().required(),
    MaxPacketSize: joi.number().required(),
    MaxCustomFileSize: joi.number().required(),
  });
