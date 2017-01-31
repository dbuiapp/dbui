import global from 'global';
import { handleActions } from 'redux-actions';
import { actionTypes } from './actions';
import createEffectHandler from '../../util/createEffectHandler';
import { overrideState } from '../connections/actions';

async function init({ dispatch }) {
  const connectionStateValue = global.localStorage.getItem('connectionState');
  const connectionState = JSON.stringify(connectionStateValue);
  if (connectionState) {
    dispatch(overrideState(JSON.parse(connectionState)));
  }
}

export default createEffectHandler(handleActions({
  [actionTypes.INIT]: init,
}));
