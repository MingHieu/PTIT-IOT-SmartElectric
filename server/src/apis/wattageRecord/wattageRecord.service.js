const prisma = require('../../database/prisma/prisma.service');
const { notificationService } = require('../../notification');

const reportWattage = async (body) => {
  const { outletCode, port, value } = body;
  const device = await prisma.device.findUnique({
    where: { port_outletCode: { outletCode, port } },
  });
  await prisma.wattageRecord.create({
    data: {
      deviceId: device.id,
      value,
    },
  });
  if (value) {
    await checkWattage(outletCode);
  }
};

const checkWattage = async (outletCode) => {
  const { deviceService } = require('../device');
  const { outletService } = require('../outlet');
  const devices = await prisma.device.findMany({
    where: { outletCode },
    orderBy: {
      priority: 'asc',
    },
    include: {
      wattageRecords: {
        take: 1,
        orderBy: { createAt: 'desc' },
      },
    },
  });
  let sumWattage = devices.reduce(
    (sum, d) => sum + d.wattageRecords[0]?.value || 0,
    0
  );
  const maxWattage = await outletService.getMaxWattage(outletCode);
  const turnOffDevices = [];
  for (const device of devices) {
    if (sumWattage <= maxWattage) {
      break;
    }
    sumWattage -= device.wattageRecords[0].value;
    turnOffDevices.push(device.name);
    await deviceService.turnDeviceOff(device.id, { outletCode });
  }
  if (!turnOffDevices.length) {
    return;
  }
  const users = await prisma.user.findMany({
    where: { outlets: { some: { code: outletCode } } },
  });
  for (const user of users) {
    if (user.fcmToken) {
      const message = notificationService.createMessage({
        to: user.fcmToken,
        title: 'Công suất quá tải',
        body:
          'Đã tắt các thiết bị sau do vượt quá mức công suất tối đa: ' +
          turnOffDevices.reduce(
            (prev, curr, index) => (index === 0 ? curr : prev + ', ' + curr),
            ''
          ),
      });
      notificationService.sendMessage(message);
    }
  }
};

module.exports = {
  reportWattage,
};
