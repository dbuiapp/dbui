import { observable } from "mobx";
import createRequest from "backend";

export default class Query {
  @observable query = null;
  @observable rows = [];
  @observable loading = false;

  constructor (id, query) {
    this.query = query;
    this.id = id;
  }

  async run () {
    const { id, query } = this;
    const action = 'query';
    this.loading = true;
    const response = await createRequest('connection', { id, action, params: { query }});
    this.loading = false;
    this.rows = response;
  }
}
