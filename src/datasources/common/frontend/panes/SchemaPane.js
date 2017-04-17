import React, { Component } from "react";
import { Form, Input } from "semantic-ui-react";

export default class SchemaPane extends Component {
  render () {
    return <div>
      <Form onSubmit={this.onSubmit}>
        <Input name="query" placeholder="Schema" />
      </Form>
    </div>;
  }
}
