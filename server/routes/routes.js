const express = require('express');
const router = express.Router();

const userRoutes = require('./user/user');
const addRoutes = require('./add/add')

router.use('/user', userRoutes);
router.use('/add', addRoutes);

module.exports = router;