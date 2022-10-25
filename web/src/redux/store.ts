import {
  applyMiddleware,
  combineReducers,
  compose,
  configureStore,
} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import config from 'src/config';

const composeEnhancers = config.isDevEnv
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  : compose; //Redux dev tools set up

// Combine reducers into root reducer
const rootReducer = combineReducers({});

const store = configureStore({
  reducer: rootReducer,
  middleware: composeEnhancers(applyMiddleware(thunk)),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

export type State = ReturnType<typeof rootReducer>;
