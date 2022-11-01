import { Schema } from "mongoose";
import { System } from "shared";

export const dbSystemSchema = new Schema<System>(
  {
    firstExecution: {
      type: Boolean,
      required: true,
    },
    updateInterval: {
      type: Number,
      required: true,
    },
    debug: {
      type: Boolean,
      required: true,
    },
    isSteamCMDRunning: {
      type: Boolean,
      required: true,
    },
  },
  {
    collection: "system",
    capped: {
      size: 1024,
      max: 1,
      autoIndexId: true,
    },
  }
);
