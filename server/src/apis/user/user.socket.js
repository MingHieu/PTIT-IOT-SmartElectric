const { WebSocketServer, WebSocket } = require('ws');

/**
 * @type {Object<string,WebSocket>}
 */
const userSockets = {};

/**
 *
 * @param {WebSocketServer} wss
 */
const setupUserSocket = (data, socket) => {
  if (data.type == 'user') {
    userSockets[data.id] = socket;
  }
};

const sendDataToUser = (id, data) => {
  userSockets[id]?.send(JSON.stringify(data));
};

module.exports = { setupUserSocket, sendDataToUser };
