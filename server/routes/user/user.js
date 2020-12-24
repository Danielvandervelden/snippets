const express = require('express');
const router = express.Router();

const userController = require('../../controllers/user');

router.use('/register', userController.register);
router.use('/login', userController.login);
router.use('/logout', userController.logout);
router.use('/auth', userController.auth);

module.exports = router;