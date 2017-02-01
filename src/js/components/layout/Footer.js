import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <div className="footer text-center">
        &copy; {(new Date()).getFullYear()} Richard Hoffman
      </div>
    );
  }
}

export default Footer;
