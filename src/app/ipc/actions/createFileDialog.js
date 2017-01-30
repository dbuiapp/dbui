import { dialog } from 'electron';
import { platform } from 'os';

export default async function (payload) {
  const response = await new Promise((resolve, reject) => {
    if (!payload.defaultPath) {
      const currentPlatform = platform();
      if (currentPlatform.match(/^win/) && process.env.USERPROFILE) {
        payload.defaultPath = process.env.USERPROFILE;
      } else if (process.env.HOME) {
        payload.defaultPath = process.env.HOME;
      }
    }
    if (payload.type == 'save') {
      dialog.showSaveDialog(payload, resolve);
    } else if (payload.type == 'open') {
      dialog.showOpenDialog(payload, resolve);
    }
  });
  return response;
}
