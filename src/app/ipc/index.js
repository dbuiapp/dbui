import { ipcMain } from 'electron';
import * as actions from './actions';

ipcMain.on('request', async (event, ...args) => {
  const [requestId, action, payload] = args;
  try {
    const actionHandler = actions[action];
    if (!actionHandler) {
      throw new Error(`Action '${action}' does not exist`);
    }
    const response = await actionHandler(payload);
    event.sender.send(`response-${requestId}`, response || false); // false == no result, so we can use property access
  } catch (err) {
    console.trace(err)
    event.sender.send(`response-${requestId}`, { error: err.message || err });
  }
});
