const express = require('express');
const router = express.Router();
const userService = require('./user.service');

router.post('/fcmToken', async (req, res) => {
  await userService.setFcmToken(req.user.username, req.body);
  res.json({
    success: true,
  });
});

router.get('/dashboard', async (req, res, next) => {
  try {
    const data = await userService.dashboard(req.user.username);
    res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
