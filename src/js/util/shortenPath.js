export default path => {
  const chunks = path.split(/\/+/g);
  return chunks.map((dir, index) => (index  < chunks.length - 1) ? (dir[0] || '') : dir).join('/');
}
