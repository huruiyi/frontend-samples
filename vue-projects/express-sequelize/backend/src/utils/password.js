const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 12;

async function hashPassword(plainPassword) {
  return bcrypt.hash(plainPassword, SALT_ROUNDS);
}

async function verifyPassword(plainPassword, passwordHash) {
  if (!plainPassword || !passwordHash) {
    return false;
  }
  return bcrypt.compare(plainPassword, passwordHash);
}

function assertPasswordStrength(password) {
  if (!password || typeof password !== 'string') {
    return 'password is required';
  }
  if (password.length < 8) {
    return 'password must be at least 8 characters';
  }
  if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
    return 'password must contain letters and numbers';
  }
  return null;
}

module.exports = {
  hashPassword,
  verifyPassword,
  assertPasswordStrength
};
