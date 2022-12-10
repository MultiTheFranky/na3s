import { System } from "shared";

import { systemAPI } from "..";

/**
 * Function to update system settings
 * @param {string} token
 * @param {System} settings
 * @returns {string} Message
 */
export const postSettings = async (settings: System, token: string) => {
  const { data } = await systemAPI.post("", settings, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data as string;
};
