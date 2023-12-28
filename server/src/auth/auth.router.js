const express = require('express');
const router = express.Router();
const authService = require('./auth.service');

router.post('/signup', async (req, res, next) => {
  try {
    const user = await authService.signUp(req.body);
    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const user = await authService.login(req.body);
    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/me', authService.authenticateToken, async (req, res) => {
  const user = await authService.findMe(req.user.username);
  res.json({
    success: true,
    data: user,
  });
});

module.exports = router;
