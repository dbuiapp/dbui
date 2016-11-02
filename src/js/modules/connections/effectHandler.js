import { handleActions } from 'redux-actions';

import { actionTypes, newConnection, setCurrentConnection } from './actions';
import createEffectHandler from '../../util/createEffectHandler';
import { createRequest } from '../../backend';
import * as datasources from '../../datasources';
import { delay } from '../../util';

export default createEffectHandler(handleActions({
  [actionTypes.ADD_CONNECTION]: addConnection,
  [actionTypes.SELECT_CONNECTION]: selectConnection
}));

async function addConnection (store, { payload }) {
  try {
    const response = await createRequest('datasource', { action: 'addConnection', type: payload.type, payload });

    store.dispatch(newConnection(response));

    await store.dispatch(setCurrentConnection(response))
  } catch (err) {
    console.error(err);
  }
}

async function selectConnection (store, { payload }) {
  try {
    //const response = await createResponse('datasource', {action: 'selectConnection', payload});

    const p = store.dispatch(setCurrentConnection(payload));
    console.log(p)
  } catch (err) {
    console.error(err);
  }
}
