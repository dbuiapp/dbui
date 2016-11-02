import { actionTypes } from './actions';
import createEffectHandler from '../../util/createEffectHandler';
import { handleActions } from 'redux-actions';

export default createEffectHandler(handleActions({
  [actionTypes.INIT]: init
}));

async function init ({ dispatch, getState }, { payload }) {
}
