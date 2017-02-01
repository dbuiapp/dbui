import { dialog } from 'electron';
import { platform } from 'os';

export default async function (payload) {
  const { type, ...options } = payload;
  const response = await new Promise((resolve) => {
    if (!options.defaultPath) {
      const currentPlatform = platform();
      if (currentPlatform.match(/^win/) && process.env.USERPROFILE) {
        options.defaultPath = process.env.USERPROFILE;
      } else if (process.env.HOME) {
        options.defaultPath = process.env.HOME;
      }
    }
    if (type === 'save') {
      dialog.showSaveDialog(options, resolve);
    } else if (type === 'open') {
      dialog.showOpenDialog(options, resolve);
    }
  });
  return response;
}
