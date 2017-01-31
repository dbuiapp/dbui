import { handleActions } from 'redux-actions';
import { actionTypes } from './actions';

function addNotification(action, state) {
  const category = action.payload.category || 'default';
  return {
    ...state,
    notifications: {
      ...state.notifications,
      [category]: [...(state.notifications.category || []), action],
    },
  };
}

function removeNotification(action, state) {
  // TODO
  return state;
}

function clearNotifications(action, state) {
  // TODO
  return state;
}

export default handleActions({
  [actionTypes.LOAD_START]: (action, state) => ({ ...state, loading: { ...state.loading, [action.payload || 'default']: true } }),
  [actionTypes.LOAD_END]: (action, state) => ({ ...state, loading: { ...state.loading, [action.payload || 'default']: false } }),
  [actionTypes.ADD_NOTIFICATION]: addNotification,
  [actionTypes.REMOVE_NOTIFICATION]: removeNotification,
  [actionTypes.CLEAR_NOTIFICATIONS]: clearNotifications,
}, { loading: {}, notifications: {} });
