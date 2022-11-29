import joi from "joi";
import { Schema, model } from "mongoose";
import { SteamCMDUser } from "shared";

export const dbSteamCMDUserSchema = new Schema<SteamCMDUser>(
  {
    username: {
      type: String,
      required: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    steamGuardCode: {
      type: String,
      required: false,
    },
  },
  {
    collection: "steamcmdUser",
    capped: {
      autoIndexId: false,
      max: 1,
    },
  }
);

export const steamCMDModel = model<typeof dbSteamCMDUserSchema>(
  "SteamCMDUser",
  dbSteamCMDUserSchema
);

export const steamCMDUserSchema: joi.ObjectSchema<SteamCMDUser> = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
  steamGuardCode: joi.string().allow(null).required(),
});
