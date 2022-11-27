import axios from "axios";

const userAPI = axios.create({
  baseURL: `http://${window.location.hostname}:${
    process.env.REACT_APP_SERVER_PORT ?? 8100
  }/api/web/user`,
});

const arma3serverAPI = axios.create({
  baseURL: `http://${window.location.hostname}:${
    process.env.REACT_APP_SERVER_PORT ?? 8100
  }/arma3server`,
});

const steamcmdAPI = axios.create({
  baseURL: `http://${window.location.hostname}:${
    process.env.REACT_APP_SERVER_PORT ?? 8100
  }/steamcmd`,
});

export { userAPI, arma3serverAPI, steamcmdAPI };
