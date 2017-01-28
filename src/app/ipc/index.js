import { ipcMain } from 'electron';
import * as actions from './actions';

ipcMain.on('request', async (event, ...args) => {
  try {
    const requestId = args[0];
    const action = args[1];
    const payload = args[2];
    const actionHandler = actions[action];
    if (!actionHandler) {
      throw new Error(`Action '${action}' does not exist`);
    }
    const response = await actionHandler(payload);
    event.sender.send(`response-${requestId}`, response);
  } catch (err) {
    event.sender.send(`response-${requestId}`, { error: err.message || err });
  }
});
