import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeNotification } from '../../modules/ui/actions';

export class NotificationList extends Component {
  onRemove = (event) => {
    const { category, dispatch } = this.props;
    const index = event.target.getAttribute('data-index');

    dispatch(removeNotification({ category, index }));
  }

  render() {
    console.log(this.props);
    const { category = 'default', notifications, ...restProps } = this.props;
    console.log(notifications, notifications[category]);
    return notifications && notifications[category] && notifications[category].length ? (
      <ul {...restProps} >
        {(notifications[category] || [])
          // .filter(notification => (category && notification.category) ? (notification.category == category) : true)
          .map((notification, index) => {
            if (typeof notification === 'string') {
              return (
                <li onClick={this.onRemove} data-index={index}>{notification}</li>
              );
            }
            const { message, ..._restProps } = notification;
            return (
              <li onClick={this.onRemove} data-index={index} {..._restProps}>{message}</li>
            );
          },
        )}
      </ul>
    ) : null;
  }
}

export default connect(state => ({
  notifications: state.ui.notifications,
}))(NotificationList);
