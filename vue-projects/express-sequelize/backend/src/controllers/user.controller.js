const { User } = require('../models');
const { hashPassword, assertPasswordStrength } = require('../utils/password');
const { toPublicUser } = require('../utils/user');

async function createUser(req, res) {
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
    return res.status(201).json(toPublicUser(user));
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'email already exists' });
    }
    return res.status(500).json({ message: error.message });
  }
}

async function getUsers(req, res) {
  try {
    const users = await User.findAll({ order: [['id', 'DESC']] });
    return res.json(users.map(toPublicUser));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function getUserById(req, res) {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }

    return res.json(toPublicUser(user));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function updateUser(req, res) {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }

    const { name, email, password } = req.body;
    if (!name && !email && !password) {
      return res.status(400).json({ message: 'at least one field is required' });
    }

    const patch = {
      name: name ?? user.name,
      email: email ?? user.email
    };

    if (password) {
      const passwordError = assertPasswordStrength(password);
      if (passwordError) {
        return res.status(400).json({ message: passwordError });
      }
      patch.passwordHash = await hashPassword(password);
    }

    await user.update(patch);
    return res.json(toPublicUser(user));
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'email already exists' });
    }
    return res.status(500).json({ message: error.message });
  }
}

async function deleteUser(req, res) {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }

    await user.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};
