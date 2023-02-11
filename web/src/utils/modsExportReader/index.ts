import { Arma3Mod } from "shared";

/**
 * Function to read the HTML string and return the Arma3Mods object
 * @param {string} html  HTML string to read with format
 * @returns {Arma3Mod[]} Array of Arma3Mod objects
 */
export const readHTML = (html: string): Arma3Mod[] => {
  // Create a new DOM parser
  const parser = new DOMParser();

  // Parse the HTML string
  const doc = parser.parseFromString(html, "text/html");

  // Get the mod list
  const modList = doc.getElementsByClassName("mod-list")[0];

  // Get the table
  const table = modList.getElementsByTagName("table")[0];

  // Get the rows
  const rows = table.getElementsByTagName("tr");

  // Create the array of Arma3Mod objects
  const mods: Arma3Mod[] = [];

  // Loop through the rows
  for (let i = 0; i < rows.length; i++) {
    // Get the row
    const row = rows[i];

    // Get the type
    const type = row.getAttribute("data-type");

    // If the type is ModContainer
    if (type === "ModContainer") {
      // Get the DisplayName
      const displayName = row.getElementsByTagName("td")[0].innerHTML;

      // Check if mod is local or from workshop
      const local = row.getElementsByClassName("from-local")[0] !== undefined;

      if (local) {
        continue; // Skip local mods for now (TODO: Add support for local mods)
      }
      // Get the Link
      const link = row
        .getElementsByTagName("td")[2]
        .getElementsByTagName("a")[0].innerHTML;

      // Create the Arma3Mod object
      const mod: Arma3Mod = {
        id: link.split("=")[1],
        name: displayName,
        path: link.split("=")[1],
        enabled: true,
      };

      // Push the mod to the array
      mods.push(mod);
    }
  }

  // Return the array of Arma3Mod objects
  return mods;
};
