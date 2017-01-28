import mapActions from '../../util/mapActions';
import { createAction } from 'redux-actions';

export const actionTypes = mapActions([
  'INIT',
  'LOAD_START',
  'LOAD_END',
  'ADD_NOTIFICATION',
], 'UI');

export default actionTypes;

export const loadStart = createAction(actionTypes.LOAD_START);
export const loadEnd = createAction(actionTypes.LOAD_END);
export const addNotification = createAction(actionTypes.ADD_NOTIFICATION);
