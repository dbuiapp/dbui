export default effectHandler => store => next => (action) => {
  effectHandler(store, action);
  next(action);
};
