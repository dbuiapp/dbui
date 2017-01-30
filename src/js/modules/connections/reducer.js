import actionTypes from './actions';
import { handleActions } from 'redux-actions';

export default handleActions({
  [actionTypes.NEW_CONNECTION]: (state, action) => ({ ...state, existingConnections: [...state.existingConnections, action.payload] }),
  [actionTypes.RESET_CONNECTION_SELECTOR]: state => ({ ...state, resetConnectionSelector: true }),
  [actionTypes.FREE_CONNECTION_SELECTOR]: state => ({ ...state, resetConnectionSelector: false }),
  [actionTypes.REMOVE_CONNECTION]: (state, { payload }) => ({ ...state, existingConnections: state.existingConnections.filter(conn => conn.id != payload.id) }),
  [actionTypes.SET_CURRENT_CONNECTION]: setCurrentConnection,
  [actionTypes.OVERRIDE_STATE]: (state, { payload }) => (payload),
  [actionTypes.UPDATE_CONNECTION]: updateConnection
}, { existingConnections: [], connectionData: {} });

function setCurrentConnection (state, { payload }) {
  const { existingConnections } = state;
  const currentConnection = existingConnections.filter(conn => conn.id == payload.id)[0];
  if (!currentConnection) {
    return state;
  }
  return {
    ...state,
    currentConnection
  };
}

function updateConnection (state, { payload }) {

// we need to do a full refresh of the connections
  let updatedConnection = null, currentConnection = null;
  const existingConnections = state.existingConnections.map(conn => {
    if (conn.id = payload.id) {
      updatedConnection = Object.assign({}, updatedConnection, payload);
    }
    return conn;
  });
  if (!updatedConnection) {
    return state;
  }

  if (state.currentConnection.id == payload.id) {
    currentConnection = updatedConnection;
  } else {
    currentConnection = state.currentConnection;
  }

  return {
    ...state,
    currentConnection,
    existingConnections
  };
}
