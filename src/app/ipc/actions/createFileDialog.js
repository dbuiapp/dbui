import { dialog } from 'electron';

export default async function (payload) {
  const response = await new Promise((resolve, reject) => {
    if (payload.type == 'save') {
      dialog.showSaveDialog({ ...payload }, resolve);
    } else if (payload.type == 'open') {
      dialog.showOpenDialog({ ...payload }, resolve);
    }
  });
  return response;
}
