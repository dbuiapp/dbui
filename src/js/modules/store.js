import { createStore as reduxCreateStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import { reducer as uiReducer, effectHandler as uiEffectHandler } from './ui';
import { reducer as connectionsReducer, effectHandler as connectionsEffectHandler } from './connections';

const initialState = {
  connections: {
    existingConnections: [],
  },
  ui: {},
};

export function createStore() {
  return reduxCreateStore(combineReducers({
    ui: uiReducer,
    connections: connectionsReducer,
  }), initialState, applyMiddleware(uiEffectHandler, connectionsEffectHandler, createLogger()));
}

export default createStore;
