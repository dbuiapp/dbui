import React, { Component } from "react";
import { Input } from "semantic-ui-react";
import { inject, observer } from "mobx-react";

export default class Label extends Component {
  render () {
    const { params } = this.props;
    return <span>SQLite {params.path}</span>;
  }
}
