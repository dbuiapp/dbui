import { handleActions } from 'redux-actions';

import {
  actionTypes,
  newConnection,
  setCurrentConnection,
  removeConnection,
  resetConnectionSelector,
  freeConnectionSelector,
} from './actions';
import createEffectHandler from '../../util/createEffectHandler';
import { createRequest } from '../../backend';
import * as datasources from '../../datasources';
import { delay } from '../../util';

export default createEffectHandler(handleActions({
  [actionTypes.ADD_CONNECTION]: addConnection,
  [actionTypes.SELECT_CONNECTION]: selectConnection,
  [actionTypes.CLOSE_CONNECTION]: closeConnection,
}));

async function addConnection(store, { payload }) {
  try {
    const response = await createRequest('datasource', { action: 'addConnection', type: payload.type, payload });

    store.dispatch(newConnection(response));

    store.dispatch(setCurrentConnection(response));

    store.dispatch(resetConnectionSelector());
    store.dispatch(freeConnectionSelector());
  } catch (err) {
    console.error(err);
  }
}

async function selectConnection(store, { payload }) {
  try {
    // const response = await createResponse('datasource', {action: 'selectConnection', payload});

    store.dispatch(setCurrentConnection(payload));
  } catch (err) {
    console.error(err);
  }
}

async function closeConnection(store, { payload }) {
  try {
    console.log(payload);
    // remove from backend

    store.dispatch(removeConnection(payload));
  } catch (err) {
    console.error(err);
  }
}
