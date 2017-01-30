import { handleActions } from 'redux-actions';

import {
  actionTypes,
  newConnection,
  setCurrentConnection,
  removeConnection,
  resetConnectionSelector,
  freeConnectionSelector,
  connectionData
} from './actions';
import createEffectHandler from '../../util/createEffectHandler';
import { createRequest } from '../../backend';
import * as datasources from '../../datasources';
import { delay } from '../../util';

export default createEffectHandler(handleActions({
  [actionTypes.ADD_CONNECTION]: addConnection,
  [actionTypes.SELECT_CONNECTION]: selectConnection,
  [actionTypes.CLOSE_CONNECTION]: closeConnection,
  [actionTypes.CONNECTION_ACTION]: connectionAction,
  [actionTypes.SAVE_STATE]: saveState
}));

async function addConnection(store, { payload }) {
  try {
    const response = await createRequest('datasource', { action: 'addConnection', type: payload.type, payload });

    store.dispatch(newConnection(response));

    store.dispatch(setCurrentConnection(response));

    store.dispatch(resetConnectionSelector());
    store.dispatch(freeConnectionSelector());

//    await saveState(store);
  } catch (err) {
    console.error(err);
  }
}

async function selectConnection(store, { payload }) {
  try {
    // const response = await createResponse('datasource', {action: 'selectConnection', payload});
    store.dispatch(setCurrentConnection(payload));

    await saveState(store);
  } catch (err) {
    console.error(err);
  }
}

async function closeConnection(store, { payload }) {
  try {
    console.log(payload);
    // remove from backend
    await createRequest('removeConnection', payload);
    store.dispatch(removeConnection(payload));
  } catch (err) {
    console.error(err);
  }
}

async function connectionAction (store, { payload }) {
  try {
    const { type, action } = payload;
    const datasource = datasources[type];
    if (!datasource) {
      throw new Error(`Datasource does not exist: "${type}"`);
    }
    const actionHandler = datasource.actions[action];
    if (!actionHandler) {
      throw new Error(`Action does not exist: "${action}"`);
    }
    const response = await actionHandler(store, payload);
  } catch (err) {
    console.error(err);
  }
}

async function saveState (store, { payload }) {
  const connectionState = store.getState().connections;
  localStorage.setItem('connectionState', JSON.stringify(connectionState));
}
