import {Env} from '../utils/enums';

const isDevEnv = process.env.NODE_ENV === Env.DEVLEOPMENT;
const isTestEnv = process.env.NODE_ENV === Env.TEST;

const isProdEnv = !isDevEnv && !isTestEnv;

const config = {
  isDevEnv,
  isTestEnv,
  isProdEnv,

  baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:5000',
};

export default config;
