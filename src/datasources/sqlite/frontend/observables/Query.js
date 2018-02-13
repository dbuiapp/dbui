import { observable } from "mobx";
import createRequest from "backend";

export default class Query {
  @observable query = null;
  @observable rows = [];
  @observable loading = false;
  @observable error = null;
  @observable expanded = false;

  constructor (id, query) {
    this.query = query;
    this.id = id;
  }

  async run (writeError) {
    const { id, query } = this;
    const action = 'query';
    this.rows = [];
    this.error = null;
    this.loading = true;
    this.expanded = true;
    try {
      const response = await createRequest('connection', { id, action, params: { query }});
      this.rows = response || [];
      this.loading = false;
    } catch (err) {
      this.loading = false;
      if (writeError) {
        this.error = err.message;
      } else {
        throw err;
      }
    }
  }
}
