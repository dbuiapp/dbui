import { handleActions } from 'redux-actions';
import { actionTypes } from './actions';

function addNotification(state, { payload }) {
  if (!payload.message) {
    throw new Error('Message not defined');
  }
  const { category = 'default' } = payload;
  return {
    ...state,
    notifications: {
      ...state.notifications,
      [category]: [...(state.notifications[category] || []), payload],
    },
  };
}

function removeNotification(state, { payload }) {
  const { category = 'default', index } = payload;
  const categoryNotifications = (state.notifications[category] || []);
  categoryNotifications.splice(index, 1);
  return {
    ...state,
    notifications: {
      ...state.notifications,
      [category]: categoryNotifications.slice(),
    },
  };
}

function clearNotifications(state, { payload }) {
  const category = payload.category || 'default';
  return {
    ...state,
    notifications: {
      ...state.notifications,
      [category]: [],
    },
  };
}

export default handleActions({
  [actionTypes.LOAD_START]: (state, action) => ({ ...state, loading: { ...state.loading, [action.payload || 'default']: true } }),
  [actionTypes.LOAD_END]: (state, action) => ({ ...state, loading: { ...state.loading, [action.payload || 'default']: false } }),
  [actionTypes.ADD_NOTIFICATION]: addNotification,
  [actionTypes.REMOVE_NOTIFICATION]: removeNotification,
  [actionTypes.CLEAR_NOTIFICATIONS]: clearNotifications,
  [actionTypes.SET_DIMENSIONS]: (state, { payload }) => ({ ...state, dimensions: payload }),
}, {});
