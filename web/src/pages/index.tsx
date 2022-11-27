import { Home as HomeIcon, StorageOutlined } from "@mui/icons-material";

import { Home } from "./home";
import { ServerList } from "./serverList";

export type Page = {
  name: string;
  icon: JSX.Element;
  component: JSX.Element;
};
export const dashboardPages: Page[] = [
  {
    name: "Home",
    icon: <HomeIcon />,
    component: <Home />,
  },
  {
    name: "Server List",
    icon: <StorageOutlined />,
    component: <ServerList />,
  },
];
