import actionTypes from './actions'
import { handleActions } from 'redux-actions';

export default handleActions({
  [actionTypes.NEW_CONNECTION]: (state, action) => ({...state, existingConnections: [...state.existingConnections, action.payload]}),
  [actionTypes.RESET_CONNECTION_SELECTOR]: (state) => ({...state, resetConnectionSelector: true}),
  [actionTypes.FREE_CONNECTION_SELECTOR]: (state) => ({...state, resetConnectionSelector: false}),
  [actionTypes.REMOVE_CONNECTION]: (state, { payload }) => ({...state, existingConnections: state.existingConnections.filter(conn => conn.id != payload.id)}),
  [actionTypes.SET_CURRENT_CONNECTION]: (state, action) => ({...state, currentConnection: action.payload})
}, {existingConnections: []});
