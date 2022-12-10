import { System } from "shared";

import { systemAPI } from "..";

/**
 * Function to get system settings
 * @param {string} token
 * @returns {System} System
 */
export const getSettings = async (token: string) => {
  const { data } = await systemAPI.get("", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data as System;
};
