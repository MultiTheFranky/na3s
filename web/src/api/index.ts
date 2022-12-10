import axios from "axios";

const BASE_URL = `http://${window.location.hostname}:${
  process.env.REACT_APP_SERVER_PORT ?? 8100
}/api`;

const userAPI = axios.create({
  baseURL: `${BASE_URL}/web/user`,
});

const arma3serverAPI = axios.create({
  baseURL: `${BASE_URL}/arma3server`,
});

const steamcmdAPI = axios.create({
  baseURL: `${BASE_URL}/steamcmd`,
});

const systemAPI = axios.create({
  baseURL: `${BASE_URL}/system`,
});

export { userAPI, arma3serverAPI, steamcmdAPI, systemAPI };
