const { WebSocketServer, WebSocket } = require('ws');
const prisma = require('../../database/prisma/prisma.service');
const { sendDataToUser } = require('../user/user.socket');

/**
 * @type {Object<string,WebSocket>}
 */
const outletSockets = {};

/**
 *
 * @param {WebSocketServer} wss
 */
const setupOutletSocket = (data, socket) => {
  if (data.type == 'createOutlet') {
    handleCreateOutlet(data.data, socket);
  }
};

const handleCreateOutlet = (data, socket) => {
  try {
    outletSockets[data.outletCode] = socket;
    const outletService = require('./outlet.service');
    outletService.upsert(data);
  } catch (error) {
    console.error(error);
  }
};

const sendDataToOutlet = async (code, data) => {
  console.log(outletSockets[code], data);
  outletSockets[code]?.send(JSON.stringify(data));
  const users = await prisma.user.findMany({
    where: { outlets: { some: { code } } },
  });
  for (const user of users) {
    sendDataToUser(user.id, { code, ...data });
  }
};

module.exports = { setupOutletSocket, sendDataToOutlet };
