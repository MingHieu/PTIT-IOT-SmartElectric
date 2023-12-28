const express = require('express');
const router = express.Router();
const { authRouter, authenticateToken } = require('../auth');
const { userRouter } = require('./user');
const { deviceRouter } = require('./device');
const { outletRouter } = require('./outlet');

router.use('/auth', authRouter);
router.use(authenticateToken);
router.use('/user', userRouter);
router.use('/device', deviceRouter);
router.use('/outlet', outletRouter);

module.exports = router;
