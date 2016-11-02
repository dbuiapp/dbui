import mapActions from '../../util/mapActions';
import { createAction } from 'redux-actions';

export const actionTypes = mapActions([
  'ADD_CONNECTION',
  'NEW_CONNECTION',
  'CLOSE_CONNECTION',
  'SELECT_CONNECTION',
  'SET_CURRENT_CONNECTION',
  'RESET_CONNECTION_SELECTOR',
  'FREE_CONNECTION_SELECTOR'
], 'CONNECTIONS');

export default actionTypes;

export const addConnection = createAction(actionTypes.ADD_CONNECTION);
export const newConnection = createAction(actionTypes.NEW_CONNECTION);
export const closeConnection = createAction(actionTypes.CLOSE_CONNECTION);
export const selectConnection = createAction(actionTypes.SELECT_CONNECTION);
export const setCurrentConnection = createAction(actionTypes.SET_CURRENT_CONNECTION);
export const resetConnectionSelector = createAction(actionTypes.RESET_CONNECTION_SELECTOR);
export const freeConnectionSelector = createAction(actionTypes.FREE_CONNECTION_SELECTOR);
