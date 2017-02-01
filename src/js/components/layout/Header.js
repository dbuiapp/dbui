import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NotificationList } from '../common';

class Header extends Component {
  render() {
    return (
      <NotificationList className="no-bullet notification-list" style={{position: 'fixed', width: '100%', top: 0, left: 0, zIndex: 1 }} />
    );
  }
}

export default Header;
