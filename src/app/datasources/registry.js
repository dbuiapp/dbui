const registry = {};

export function addConnection (connectionInfo) {
  registry[connectionInfo.id] = connectionInfo;
}

export function all () {
  return registry;
}

export function removeConnection (id) {
  delete registry[id];
}

export function getConnection (id) {
  return registry[id];
}
