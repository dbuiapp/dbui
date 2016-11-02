import actionTypes from './actions'
import { handleActions } from 'redux-actions';

export default handleActions({
  [actionTypes.LOAD_START]: (action, state) => ({...state, loading: action.payload})
}, {});
