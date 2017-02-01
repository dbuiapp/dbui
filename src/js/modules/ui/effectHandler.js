import global from 'global';
import { handleActions } from 'redux-actions';
import { actionTypes } from './actions';
import createEffectHandler from '../../util/createEffectHandler';
import { initConnections } from '../connections/actions';
import { setDimensions } from '../ui/actions';

async function init({ dispatch }) {
  const connectionStateValue = global.localStorage.getItem('connectionState');
  const connectionState = JSON.parse(connectionStateValue);
  if (connectionState) {
    dispatch(initConnections(connectionState));
  }

  function onResize () {
    const dimensions = {
      height: global.innerHeight,
      width: global.innerWidth
    };
    dispatch(setDimensions(dimensions));
  }

  // this  is less useful on its own, it's more a way to signal to other
  // components that the viewing area has changed, but those components should
  // check their own dimensions instead of relying on these values
  global.addEventListener('resize', onResize);

  onResize();
}

export default createEffectHandler(handleActions({
  [actionTypes.INIT]: init,
}));
