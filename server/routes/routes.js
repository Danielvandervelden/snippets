const express = require('express');
const router = express.Router();

const userRoutes = require('./user/user');
const addRoutes = require('./add/add');
const getRoutes = require('./get/get');
const deleteRoutes = require('./delete/delete');
const updateRoutes = require('./update/update');

router.use('/user', userRoutes);
router.use('/add', addRoutes);
router.use('/get', getRoutes);
router.use('/delete', deleteRoutes);
router.use('/update', updateRoutes);

module.exports = router;