import React, { Component } from "react";
import { Form, Input, Accordion } from "semantic-ui-react";

export default class QueryPane extends Component {
  onSubmit = (event) => {
    const { connection } = this.props;
    event.preventDefault();
  }

  render () {
    return <div>
      <Form onSubmit={this.onSubmit}>
        <Input fluid name="query" placeholder="Query" action="Submit" />
      </Form>
    </div>;
  }
}
