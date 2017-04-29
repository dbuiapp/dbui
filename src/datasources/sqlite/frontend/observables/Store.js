import { observable } from "mobx";
import Query from "./Query";
import Schema from "./Schema";

export default class Store {
  @observable queries = [];
  @observable schema = null;
  @observable visualizations = {};

  @observable queryLoading = false;
  @observable lastMessage = null;
  @observable lastError = null;

  constructor (id) {
    this.id = id;
  }

  async loadSchema () {
    this.schema = new Schema(this.id);
    await this.schema.load();
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
  }
}
