import { observable } from "mobx";
import createRequest from "backend";

export default class Query {
  @observable loading = false;
  @observable error = null;
  @observable meta = {};

  constructor (id) {
    this.id = id;
  }

  async load () {
    const { id } = this;
    const action = 'schema';
    this.loading = true;
    try {
      const response = await createRequest('connection', { id, action });
      this.meta = response;
    } catch (err) {
      this.error = err.message;
    }
    this.loading = false;
  }
}
