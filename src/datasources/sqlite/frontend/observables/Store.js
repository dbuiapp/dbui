import { observable } from "mobx";
import createRequest from "backend";
import Query from "./Query";

export default class Store {
  @observable queries = [];
  @observable schema = {};
  @observable visualizations = {};

  constructor (id) {
    this.id = id;
  }

  async addQuery (query) {
    const queryData = new Query(this.id, query);
    this.queries.push(queryData);
    await queryData.run();
  }
}
