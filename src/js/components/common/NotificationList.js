import React, { Component } from 'react';
import { connect } from 'react-redux';

export class NotificationList extends Component {
  render() {
    const { filter, notifications, ...restProps } = this.props;
    return notifications && notifications.length ? (
      <ul {...restProps} >
        {notifications
          .filter(notification => (filter && notification.filter) ? (notification.filter == filter) : true)
          .map((notification) => {
            if (typeof notification === 'string') {
              return (
                <li>{notification}</li>
              );
            }
            const { message, ...restProps } = notification;
            return (
              <li {...restProps}>{message}</li>
            );
          },
        )}
      </ul>
    ) : null;
  }
}

export default connect((state) => {
  notifications: state.ui.notifications;
})(NotificationList);
