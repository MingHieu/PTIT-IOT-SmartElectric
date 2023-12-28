const prisma = require('../../database/prisma/prisma.service');
const moment = require('moment');
const { scheduleJob } = require('node-schedule');
const { sendDataToOutlet } = require('../outlet');
const { wattageRecordService } = require('../wattageRecord');

const getOne = async (
  id,
  from = moment().startOf('day').toDate(),
  to = moment().endOf('day').toDate()
) => {
  const device = await prisma.device.findUnique({
    where: { id },
    include: {
      wattageRecords: {
        orderBy: { createAt: 'desc' },
        where: {
          createAt: {
            gte: from,
            lte: to,
          },
        },
      },
    },
  });
  return device;
};

const update = async (id, body) => {
  const device = await prisma.device.update({ where: { id }, data: body });
  return device;
};

const turnDeviceOn = async (id, body) => {
  const { outletCode } = body;
  const device = await prisma.device.update({
    where: { id },
    data: { state: true },
  });
  sendDataToOutlet(outletCode, { port: device.port, state: true });
};

const turnDeviceOff = async (id, body) => {
  const { outletCode } = body;
  const device = await prisma.device.update({
    where: { id },
    data: { state: false, offTime: null },
  });
  sendDataToOutlet(outletCode, { port: device.port, state: false });
  await wattageRecordService.reportWattage({
    outletCode,
    port: device.port,
    value: 0,
  });
};

const jobs = {};

const setDeviceOffTime = async (id, body) => {
  const { outletCode, offTime } = body;
  if (jobs[id]) {
    jobs[id].cancel();
    jobs[id] = null;
  }
  if (offTime) {
    jobs[id] = scheduleJob(new Date(offTime * 1000), () => {
      turnDeviceOff(id, { outletCode });
    });
  }
  await prisma.device.update({
    where: { id },
    data: { offTime: offTime ? new Date(offTime * 1000) : null },
  });
};

module.exports = {
  getOne,
  turnDeviceOn,
  turnDeviceOff,
  setDeviceOffTime,
  update,
};
