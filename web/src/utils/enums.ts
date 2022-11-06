import {IRoutes} from './types';

export enum Env {
  DEVELOPMENT = 'development',
  TEST = 'test',
  PROD = 'prod',
}

export const ROUTES: IRoutes = {
  root: '/',
  home: '/home',
  login: '/login',
  register: '/register',
};
