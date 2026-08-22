const { User } = require('../models');
const { hashPassword, verifyPassword, assertPasswordStrength } = require('../utils/password');
const { signToken } = require('../utils/jwt');
const { toPublicUser } = require('../utils/user');

/**
 * 注册
 * POST /api/auth/register
 * body: { name, email, password }
 */
async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'name, email and password are required' });
    }

    const passwordError = assertPasswordStrength(password);
    if (passwordError) {
      return res.status(400).json({ message: passwordError });
    }

    const passwordHash = await hashPassword(password);
    const user = await User.create({ name, email, passwordHash });
    const token = signToken({ sub: user.id, email: user.email });

    return res.status(201).json({
      token,
      user: toPublicUser(user)
    });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'email already exists' });
    }
    return res.status(500).json({ message: error.message });
  }
}

/**
 * 登录
 * POST /api/auth/login
 * body: { email, password }
 */
async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'email and password are required' });
    }

    const user = await User.scope('withPassword').findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'invalid email or password' });
    }

    const matched = await verifyPassword(password, user.passwordHash);
    if (!matched) {
      return res.status(401).json({ message: 'invalid email or password' });
    }

    const token = signToken({ sub: user.id, email: user.email });
    return res.json({
      token,
      user: toPublicUser(user)
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

/**
 * 当前登录用户
 * GET /api/auth/me
 */
async function me(req, res) {
  return res.json({ user: toPublicUser(req.user) });
}

module.exports = {
  register,
  login,
  me
};
