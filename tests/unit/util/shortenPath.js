import { expect } from 'chai';
import { createStore, applyMiddleware } from 'redux';
import { handleActions } from 'redux-actions';
import { shortenPath } from "../../../src/js/util";

describe("shortenPath", () => {
  it("should shorten a path", (done) => {
    const original = '/Users/richard/databases/db.sqlite';
    const result = shortenPath(original);
    expect(result).to.equal('/U/r/d/db.sqlite');
    done();
  });
})
