const express = require('express');
const router = express.Router();
const deviceService = require('./device.service');

router.post('/:id', async (req, res, next) => {
  try {
    await deviceService.update(req.params.id, req.body);
    res.status(201).send({ success: true });
  } catch (error) {
    next(error);
  }
});

router.post('/:id/turnOn', async (req, res, next) => {
  try {
    await deviceService.turnDeviceOn(req.params.id, req.body);
    res.status(201).send({ success: true });
  } catch (error) {
    next(error);
  }
});

router.post('/:id/turnOff', async (req, res, next) => {
  try {
    await deviceService.turnDeviceOff(req.params.id, req.body);
    res.status(201).send({ success: true });
  } catch (error) {
    next(error);
  }
});

router.post('/:id/setOffTime', async (req, res, next) => {
  try {
    await deviceService.setDeviceOffTime(req.params.id, req.body);
    res.status(201).send({ success: true });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const device = await deviceService.getOne(
      req.params.id,
      req.query.from ? new Date(+req.query.from) : undefined,
      req.query.to ? new Date(+req.query.to) : undefined
    );
    res.json({
      success: true,
      data: device,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
