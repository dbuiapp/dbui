import { sep as separator } from 'path';

function isDriveLetter (dir) {
  return dir.match(/^[a-z]:$/i)
}

export default (path, delimiter = separator) => {
  const chunks = path.split(new RegExp(`\\${delimiter}+`, 'g'));
  return chunks.map((dir, index) => ((!isDriveLetter(dir)) &&(index < chunks.length - 1) ? (dir[0] || '') : dir)).join(delimiter);
};
