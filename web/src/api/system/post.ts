import { System } from "shared";

import { systemAPI } from "..";

/**
 * Function to update system settings
 * @param {System} settings
 * @returns {string} Message
 */
export const postSettings = async (settings: System) => {
  const { data } = await systemAPI.post("", settings);
  return data as string;
};
