import actionTypes from './actions'
import { handleActions } from 'redux-actions';

export default handleActions({
  [actionTypes.NEW_CONNECTION]: newConnection,
  [actionTypes.RESET_CONNECTION_SELECTOR]: (state) => ({...state, resetConnectionSelector: true}),
  [actionTypes.FREE_CONNECTION_SELECTOR]: () => ({...state, resetConnectionSelector: false}),
  [actionTypes.SET_CURRENT_CONNECTION]: (state, action) => ({currentConnction: action.payload})
}, {existingConnections: []});

function newConnection (state, action) {
  const newVal = ({...state, existingConnections: [...state.existingConnections, action.payload]});
  return newVal;
}
