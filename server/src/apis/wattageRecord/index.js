module.exports = {
  wattageRecordService: require('./wattageRecord.service'),
  ...require('./wattageRecord.socket'),
};
