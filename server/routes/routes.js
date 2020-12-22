const express = require('express');
const router = express.Router();

const userRoutes = require('./user/user');
const addRoutes = require('./add/add');
const getRoutes = require('./get/get');

router.use('/user', userRoutes);
router.use('/add', addRoutes);
router.use('/get', getRoutes);

module.exports = router;