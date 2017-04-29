import React, { Component } from "react";
import { Form, Input, Icon, Accordion, Loader, Button, Table, Message } from "semantic-ui-react";
import { observer, inject } from "mobx-react";

@inject("store") @observer
export default class QueryPane extends Component {
  onSubmit = (event) => {
    event.preventDefault();
    const { connection, store } = this.props;
    const query = event.target.query.value;
    if (!query.trim()) {
      return;
    }

    store.datasource.connectionData[connection.id].addQuery(query);
  }

  makeOnRefreshClick = (queryData) => (event) => {
    event.preventDefault();
    event.stopPropagation();
    queryData.run(true);
  }

  makeOnDeleteClick = (queryData) => (event) => {
    event.preventDefault();
    event.stopPropagation();
    const { connection, store } = this.props;
    store.datasource.connectionData[connection.id].removeQuery(queryData);
  }

  makeToggle = (queryData) => (event) => {
    event.preventDefault();
    event.stopPropagation();
    queryData.expanded = !queryData.expanded;
  }

  renderRows (rows) {
    return <Table striped>
      <Table.Header>
        <Table.Row>
          {
            rows.length > 0 &&
            Object.keys(rows[0]).map(key => <Table.HeaderCell>{key}</Table.HeaderCell>)
          }
          {
            rows.length < 1 &&
            <Table.HeaderCell><Message warning>No Data!</Message></Table.HeaderCell>
          }
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {
          rows.map(row => <Table.Row>
            {
              Object.values(row).map(val => <Table.Cell>{val}</Table.Cell>)
            }
          </Table.Row>)
        }
      </Table.Body>
    </Table>;
  }

  render () {
    const { store, connection } = this.props;
    const connectionData = store.datasource.connectionData[connection.id];

    return <div>
      { connectionData.lastError && <Message error>{connectionData.lastError}</Message>}
      { connectionData.lastMessage && <Message success>{connectionData.lastMessage}</Message>}
      <Form onSubmit={this.onSubmit}>
        <Input fluid name="query" placeholder="Query" loading={connectionData.queryLoading} action={!connectionData.queryLoading && "Submit"} />
      </Form>
      <Accordion>
      {
        store.datasource.connectionData[connection.id].queries.map(queryData => {
          return [
            <Accordion.Title onClick={this.makeToggle(queryData)} active={queryData.expanded}>
              <Icon name="dropdown" /> {queryData.query} -
              <Button onClick={this.makeOnRefreshClick(queryData)}><Icon name="refresh" /></Button>
              <Button onClick={this.makeOnDeleteClick(queryData)}>×</Button>
            </Accordion.Title>,
            <Accordion.Content onClick={this.makeToggle(queryData)} active={queryData.expanded}>
              {queryData.loading && <Loader active inline />}
              {!queryData.loading && !queryData.error && this.renderRows(queryData.rows)}
              {queryData.error && <Message error>{queryData.error}</Message>}
            </Accordion.Content>
          ];
        })
      }
      </Accordion>
    </div>;
  }
}
