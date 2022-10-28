import mongoose from "mongoose";

import { dbSystemSchema } from "./schema";

/**
 * Init System DB
 */
export const initSystemDb = async () => {
  const system = await mongoose.model("System", dbSystemSchema).findOne({});
  if (!system) {
    await mongoose.model("System", dbSystemSchema).create({
      firstExecution: true,
    });
  }
};

/**
 * Set first execution
 * @param {boolean} firstExecution
 */
export const setFirstExecution = async (firstExecution: boolean) => {
  await mongoose
    .model("System", dbSystemSchema)
    .updateOne({}, { firstExecution });
};

/**
 * Get first execution
 * @returns {boolean}
 */
export const getFirstExecution = async (): Promise<boolean> => {
  const system = await mongoose.model("System", dbSystemSchema).findOne({});
  return system?.firstExecution || false;
};
