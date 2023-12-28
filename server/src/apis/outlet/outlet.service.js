const prisma = require('../../database/prisma/prisma.service');

const upsert = async (body) => {
  const { outletCode, devices = [] } = body;
  const outlet = await prisma.outlet.upsert({
    where: { code: outletCode },
    create: {
      code: outletCode,
      maxWattage: 9999,
    },
    update: {},
  });
  for (const device of devices) {
    const {
      name = 'Thiết bị điện',
      port,
      priority = 0,
      state = false,
    } = device;
    await prisma.device.upsert({
      where: { port_outletCode: { port, outletCode } },
      create: {
        name,
        port,
        priority,
        state,
        outletCode,
      },
      update: {
        name,
        port,
        priority,
        state,
      },
    });
  }
  return outlet;
};

const addOutletToUser = async (username, code) => {
  const outlet = await prisma.outlet.update({
    where: { code },
    data: { username },
  });
  return outlet;
};

const getAll = async (username) => {
  const outlets = await prisma.outlet.findMany({
    where: { username },
  });
  return outlets;
};

const getOne = async (code) => {
  const outlet = await prisma.outlet.findUnique({
    where: { code },
    include: { devices: true },
  });
  return outlet;
};

const setMaxWattage = async (code, body) => {
  const { maxWattage } = body;
  await prisma.outlet.update({
    where: { code },
    data: { maxWattage },
  });
};

const getMaxWattage = async (code) => {
  const outlet = await prisma.outlet.findUnique({ where: { code } });
  return outlet.maxWattage;
};

module.exports = {
  upsert,
  addOutletToUser,
  getAll,
  getOne,
  setMaxWattage,
  getMaxWattage,
};
