const { WebSocketServer } = require('ws');

/**
 *
 * @param {WebSocketServer} wss
 */
const setupWattageRecordSocket = (data,socket) => {
  if (data.type == 'reportWattage') {
    handleReportWattage(data.data);
  }
};

const handleReportWattage = async (data) => {
  try {
    const wattageRecordService = require('./wattageRecord.service');
    await wattageRecordService.reportWattage(data);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { setupWattageRecordSocket };
