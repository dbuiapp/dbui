import { observable, action } from "mobx";
import createRequest from "../backend";
import { AsyncStorage } from "react-native";
import json from "json-promise";
import * as datasources from "datasources";

export default class Datasource {
  @observable newType = null;
  @observable connections = [];
  @observable selected = null;
  @observable connectionData = {};

  @action setNewType (selection) {
    this.newType = selection;
  }

  @action async addConnection (type, params, id) {
    const response = await createRequest("addConnection", { type, params, id });
    const { connectionId } = response;
    const connection = { id: connectionId, type, params };
    this.connections.push(connection);
    this.connectionData[connectionId] = new datasources[type].Store(connectionId);
    const connectionsStr = await json.stringify(this.connections);
    await AsyncStorage.setItem("connections", connectionsStr);
    return connection;
  }

  @action async selectConnection (id) {
    const connection = this.connections.filter(conn => conn.id === id)[0];

    if (connection) {
      this.selected = connection;
      await AsyncStorage.setItem("selected-connection", id);
    }
  }
}
