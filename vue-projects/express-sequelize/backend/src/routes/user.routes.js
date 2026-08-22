const express = require('express');
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/user.controller');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// 用户 CRUD 需登录后访问
router.use(requireAuth);

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
