import { actionTypes } from './actions';
import createEffectHandler from '../../util/createEffectHandler';
import { handleActions } from 'redux-actions';
import { actions } from '../connections';

export default createEffectHandler(handleActions({
  [actionTypes.INIT]: init
}));

async function init ({ dispatch, getState }, { payload }) {
  const connectionState = localStorage.getItem('connectionState');
  //, JSON.stringify(payload));
  if (connectionState) {
    dispatch(overrideState(JSON.parse(connectionState)));
  }
}
