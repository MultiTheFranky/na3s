import { Delete } from "@mui/icons-material";
import { List, ListItem, ListItemButton, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Arma3Server } from "shared";

export type TabProps = {
  server: Arma3Server;
  setServer: React.Dispatch<React.SetStateAction<Arma3Server>>;
  advanceMode: boolean;
};

/**
 *
 * @param param0
 * @returns
 */
export const ArrayTextField = ({
  label,
  value,
  onChange
}: {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
}) => {
  //Add a button to add a new element to the array
  //and add a textfield for each element in the array with a button to remove it
  <List dense>
    {value.map((element, valueIndex) => {
      return (
        <ListItem
          key={element}
          secondaryAction={
            <IconButton edge="end" aria-label="comments">
              <Delete />
            </IconButton>
          }
          disablePadding
        >
          <ListItemButton role={undefined} dense>
            <TextField
              label={label}
              value={element}
              onChange={(event) => {
                onChange(
                  value.map((element, index) => {
                    if (index === valueIndex) {
                      return event.target.value;
                    }
                    return element;
                  })
                );
              }}
            />
          </ListItemButton>
        </ListItem>
      );
    })}
    ;
  </List>;
};

export { ParametersTab } from "./parameters";
export { ServerConfigTab } from "./serverConfig";
export { BasicServerConfigTab } from "./basicServerConfig";
export { ModsTab } from "./mods";
export { ServerModsTab } from "./serverMods";
export { MissionsTab } from "./missions";
