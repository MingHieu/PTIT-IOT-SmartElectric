const prisma = require('../../database/prisma/prisma.service');
const argon = require('argon2');

const createOne = async (body) => {
  const { username, password, name, phoneNumber = '' } = body;
  const user = await prisma.user.create({
    data: {
      username,
      password: await argon.hash(password),
      name,
      phoneNumber,
    },
  });
  delete user.password;
  return user;
};

const getOne = async (username) => {
  const user = await prisma.user.findUnique({ where: { username } });
  delete user.password;
  return user;
};

const setFcmToken = async (username, body) => {
  const { fcmToken } = body;
  await prisma.user.update({
    where: { username },
    data: { fcmToken },
  });
};

const dashboard = async (username) => {
  const outlets = await prisma.outlet.findMany({ where: { username } });
  const devices = [];
  for (const outlet of outlets) {
    devices.push(
      ...(await prisma.device.findMany({ where: { outletCode: outlet.code } }))
    );
  }
  let wattage = 0;
  for (const device of devices) {
    const wattageRecords = await prisma.wattageRecord.findMany({
      where: { deviceId: device.id },
    });
    wattage += wattageRecords.reduce((prev, curr) => prev + curr.value, 0);
  }
  return {
    outlets: outlets.length,
    devices: devices.length,
    wattage,
  };
};

module.exports = {
  createOne,
  getOne,
  setFcmToken,
  dashboard,
};
