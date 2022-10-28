import { Schema } from "mongoose";

export const dbSystemSchema = new Schema(
  {
    firstExecution: {
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
