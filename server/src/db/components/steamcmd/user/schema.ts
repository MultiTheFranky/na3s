import joi from "joi";
import { Schema } from "mongoose";
import { SteamCMDUser } from "shared";

export const DBSteamCMDUserSchema = new Schema<SteamCMDUser>(
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
  },
  {
    collection: "steamcmdUser",
    capped: {
      autoIndexId: false,
      max: 1,
    },
  }
);

export const steamCMDUserSchema: joi.ObjectSchema<SteamCMDUser> = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
});
