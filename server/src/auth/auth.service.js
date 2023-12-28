const prisma = require('../database/prisma/prisma.service');
const argon = require('argon2');
const jwt = require('jsonwebtoken');
const { userService } = require('../apis/user');

const signUp = async (body) => {
  const user = await userService.createOne(body);
  const token = generateAccessToken({ username: user.username });
  return {
    ...user,
    token,
  };
};

const login = async (body) => {
  const { username, password } = body;
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) throw new Error('Tài khoản không tồn tại');
  const pwMatches = await argon.verify(user.password, password);
  if (!pwMatches) throw new Error('Tài khoản hoặc mật khẩu sai');
  delete user.password;
  const token = generateAccessToken({ username });
  return {
    ...user,
    token,
  };
};

function generateAccessToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET, {});
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null)
    return res.status(401).json({
      success: false,
      message: 'Vui lòng đăng nhập',
    });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res.status(401).json({
        success: false,
        message: 'Token đã hết hạn',
      });
    req.user = user;
    next();
  });
}

const findMe = async (username) => {
  const user = await userService.getOne(username);
  return user;
};

module.exports = {
  signUp,
  login,
  authenticateToken,
  findMe,
};
