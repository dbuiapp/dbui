import { action, observable } from "mobx";
import Ui from "./Ui";
import Datasource from "./Datasource";
import { AsyncStorage } from "react-native";
import json from "json-promise";


export default class Store {
  ui = new Ui();
  datasource = new Datasource();

  @action async initialize () {
    try {
      const connectionsStr = await AsyncStorage.getItem("connections");
      if (!connectionsStr) {
        return;
      }
      const connections = await json.parse(connectionsStr);
      await connections.reduce(async (promise, connection) => {
        const { type, params, id } = connection;
        await promise;
        return this.datasource.addConnection(type, params, id);
      }, Promise.resolve());

      const selectedId = await AsyncStorage.getItem("selected-connection");
      if (selectedId) {
        await this.datasource.selectConnection(selectedId);
      }
      if (!this.datasource.selected) {
        const connection = this.datasource.connections[0];
        if (connection) {
          await this.datasource.selectConnection(connection.id);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }
}
