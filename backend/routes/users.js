const express = require('express');
const {
  getAllUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
  getCurrentUser
} = require("../controllers/users");

const router = express.Router();

router.get('/me', getCurrentUser);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.post('/', createUser);


module.exports = router;