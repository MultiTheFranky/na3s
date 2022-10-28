import mongoose from "mongoose";

import { ServerEnvironment } from "../api/types";
import { loadEnvironmentVariables } from "../env";
import { logError, logInfo } from "../logger";

/**
 * Function to connect to the database
 * @returns Promise<void>
 */
export const initDb = async () => {
  const { MONGO_URL, MONGO_DB_NAME } =
    await loadEnvironmentVariables<ServerEnvironment>();
  try {
    await mongoose.connect(`${MONGO_URL}/${MONGO_DB_NAME}`);
    logInfo("🚀 Database is connected 🚀");
    return true;
  } catch (error) {
    if (error instanceof Error) {
      logError(`Error connecting to DB: ${error.message}`);
    }
    return false;
  }
};
