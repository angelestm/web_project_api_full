const express = require('express');
const fs = require('fs');
const path = require('path');
const {getAllUsers, getUser, createUser, updateProfile, updateAvatar, getUserProfile} = require("../controllers/users");

const router = express.Router();

const filePath = path.join(__dirname, '..','data', 'users.json');

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);
router.get('/me', getUserProfile);

module.exports = router;