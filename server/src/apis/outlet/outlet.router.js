const express = require('express');
const router = express.Router();
const outletService = require('./outlet.service');

router.post('/:code/add', async (req, res, next) => {
  try {
    await outletService.addOutletToUser(req.user.username, req.params.code);
    res.status(201).send({ success: true });
  } catch (error) {
    next(error);
  }
});

router.post('/:code/setMaxWattage', async (req, res, next) => {
  try {
    await outletService.setMaxWattage(req.params.code, req.body);
    res.json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/all', async (req, res) => {
  const outlets = await outletService.getAll(req.user.username);
  res.json({
    success: true,
    data: outlets,
  });
});

router.get('/:code', async (req, res, next) => {
  try {
    const outlet = await outletService.getOne(req.params.code);
    res.json({
      success: true,
      data: outlet,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
