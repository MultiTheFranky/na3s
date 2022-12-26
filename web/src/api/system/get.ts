import { System } from "shared";

import { systemAPI } from "..";

/**
 * Function to get system settings
 * @returns {System} System
 */
export const getSettings = async () => {
  const { data } = await systemAPI.get("");
  return data as System;
};
