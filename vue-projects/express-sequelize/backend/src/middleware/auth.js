const { User } = require('../models');
const { verifyToken } = require('../utils/jwt');

function extractBearerToken(req) {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');
  if (scheme !== 'Bearer' || !token) {
    return null;
  }
  return token;
}

/**
 * 强制登录：校验 Authorization: Bearer <token>
 */
async function requireAuth(req, res, next) {
  try {
    const token = extractBearerToken(req);
    if (!token) {
      return res.status(401).json({ message: 'unauthorized: missing token' });
    }

    let payload;
    try {
      payload = verifyToken(token);
    } catch {
      return res.status(401).json({ message: 'unauthorized: invalid or expired token' });
    }

    const user = await User.findByPk(payload.sub);
    if (!user) {
      return res.status(401).json({ message: 'unauthorized: user not found' });
    }

    req.user = user;
    req.auth = payload;
    return next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  requireAuth,
  extractBearerToken
};
