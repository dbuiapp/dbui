import { createAction } from 'redux-actions';
import mapActions from '../../util/mapActions';

export const actionTypes = mapActions([
  'INIT',
  'LOAD_START',
  'LOAD_END',
  'ADD_NOTIFICATION',
  'REMOVE_NOTIFICATION',
  'CLEAR_NOTIFICATIONS',
  'SET_DIMENSIONS',
], 'UI');

export default actionTypes;

export const init = createAction(actionTypes.INIT);
export const loadStart = createAction(actionTypes.LOAD_START);
export const loadEnd = createAction(actionTypes.LOAD_END);
export const addNotification = createAction(actionTypes.ADD_NOTIFICATION);
export const removeNotification = createAction(actionTypes.REMOVE_NOTIFICATION);
export const clearNotification = createAction(actionTypes.CLEAR_NOTIFICATION);
export const setDimensions = createAction(actionTypes.SET_DIMENSIONS);
