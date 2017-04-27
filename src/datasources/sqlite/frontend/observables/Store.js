import { observable } from "mobx";
import createRequest from "backend";
import Query from "./Query";

export default class Store {
  @observable queries = [];
  @observable schema = {};
  @observable visualizations = {};

  @observable queryLoading = false;
  @observable lastMessage = null;
  @observable lastError = null;

  constructor (id) {
    this.id = id;
  }

  async removeQuery (queryData) {
    this.queries = this.queries.filter(qd => qd !== queryData);
  }

  async addQuery (query) {
    this.lastError = null;
    this.lastMessage = null;
    this.queryLoading = true;
    const queryData = new Query(this.id, query);
    const isSelect = query.match(/^\s*select/i);
    if (isSelect) {
      this.queries.push(queryData);
    }
    try {
      await queryData.run();
      if (!isSelect) {
        this.lastMessage = 'Query Successful';
      }
    } catch (err) {
      if (!isSelect) {
        this.lastError = err.message;
      } else {
        queryData.error = err.message;
      }
    }
    this.queryLoading = false;

    console.log(this.lastError)
  }
}
