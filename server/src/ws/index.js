const { WebSocketServer } = require('ws');
const { setupOutletSocket } = require('../apis/outlet');
const { setupWattageRecordSocket } = require('../apis/wattageRecord');
const { setupUserSocket } = require('../apis/user/user.socket');

let wss;

const setupWSS = (server) => {
  wss = new WebSocketServer({ server });

  wss.on('connection', (ws) => {
    console.log('a user connected');

    ws.on('error', console.error);

    ws.on('message', function message(data) {
      console.log('received: %s', data);
      data = JSON.parse(data);
      setupOutletSocket(data, ws);
      setupWattageRecordSocket(data, ws);
      setupUserSocket(data, ws);
    });
  });
};

/**
 *
 * @returns {WebSocketServer}
 */
const getWSS = () => {
  return wss;
};

module.exports = { setupWSS, getWSS };
