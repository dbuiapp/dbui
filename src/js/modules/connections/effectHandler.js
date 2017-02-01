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
import {
  addNotification
} from '../ui/actions';
import createEffectHandler from '../../util/createEffectHandler';
import { createRequest } from '../../backend';
import * as datasources from '../../datasources';
import { delay } from '../../util';

async function addConnection({ dispatch }, { payload }) {
  try {
    const response = await createRequest('datasource', { action: 'addConnection', type: payload.type, payload });

    dispatch(newConnection(response));
    dispatch(setCurrentConnection(response));

    dispatch(resetConnectionSelector());
    dispatch(freeConnectionSelector());

    dispatch({type: actionTypes.SAVE_STATE});
  } catch (err) {
    console.error(err);
    dispatch(addNotification({message: err.message || err, className: 'callout alert'}));
  }
}

async function selectConnection(store, { payload }) {
  try {
    // const response = await createResponse('datasource', {action: 'selectConnection', payload});
    store.dispatch(setCurrentConnection(payload));

    // TODO: save state
  } catch (err) {
    console.error(err);
  }
}

async function closeConnection({ dispatch }, { payload }) {
  try {
    const response = await createRequest('connection', { ...payload, action: 'closeConnection' });
    await dispatch(removeConnection(payload));
    await dispatch({type: actionTypes.SAVE_STATE});
  } catch (err) {
    console.error(err);
  }
}

async function connectionAction(store, { payload }) {
  const { dispatch } = store;
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

    dispatch({type: actionTypes.SAVE_STATE});
  } catch (err) {
    console.error(err);
    dispatch(addNotification({message: err.message || err, className: 'callout alert'}));
  }
}

async function saveState({ getState}) {
  const connectionState = getState().connections;
  localStorage.setItem('connectionState', JSON.stringify(connectionState));
}

async function initConnections({ dispatch, getState }, { payload }) {
  if (!payload) {
    return;
  }
  if (!payload.existingConnections) {
    return;
  }
  for (let connection of payload.existingConnections) {
    // TODO: add the queries afterwards
    await dispatch({type: actionTypes.ADD_CONNECTION, payload: connection});
  }
}

export default createEffectHandler(handleActions({
  [actionTypes.ADD_CONNECTION]: addConnection,
  [actionTypes.SELECT_CONNECTION]: selectConnection,
  [actionTypes.CLOSE_CONNECTION]: closeConnection,
  [actionTypes.CONNECTION_ACTION]: connectionAction,
  [actionTypes.SAVE_STATE]: saveState,
  [actionTypes.INIT_CONNECTIONS]: initConnections
}));
