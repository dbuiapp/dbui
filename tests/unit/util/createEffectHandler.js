import { expect } from 'chai';
import { createStore, applyMiddleware } from 'redux';
import { handleActions } from 'redux-actions';
import { createEffectHandler } from "../../../src/js/util/";

describe("createEffectHandler", () => {
  it("should do stuff", (done) => {
    const effectHandler = createEffectHandler(handleActions({
      test: (a,b) => {console.log('test', a,b)},
      test2: (a,b) => {console.log('test2', a,b)}
    }));
    const store = createStore((state) => state,{}, applyMiddleware(effectHandler));
    store.dispatch({type: 'test'});
    store.dispatch({type: 'test3'});
    done();
  });
})
