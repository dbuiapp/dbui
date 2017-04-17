import { observable, action } from "mobx";
import createRequest from "../backend";

export default class Datasource {
  @observable newType = null;
  @observable connections = [];

  @action setNewType (selection) {
    this.newType = selection;
  }

  @action async addConnection (type, params) {
    const response = await createRequest('addConnection', { type, params });
    const { connectionId: id } = response;
    this.connections.push({ id, type, params });
  }
}
