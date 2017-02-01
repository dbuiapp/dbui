import { EventEmitter } from 'events';
import { ipcRenderer } from 'electron';

export const responder = new EventEmitter();

export const name = 'electron-ipc';

responder.setMaxListeners(0);

export const createRequest = (action, payload) => new Promise((resolve, reject) => {
  const requestId = Date.now().toString(36) + Math.random().toString(16).slice(2);

  ipcRenderer.send('request', requestId, action, payload);
  ipcRenderer.once(`response-${requestId}`, (event, payload) => {
    console.log(payload);
    if (payload.error) {
      reject(new Error(payload.error || payload));
    }
    resolve(payload);
  });
});
