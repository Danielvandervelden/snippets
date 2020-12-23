const express = require('express');
const router = express.Router();

const deleteController = require('../../controllers/delete');

router.use('/category', deleteController.category);
router.use('/snippety', deleteController.snippet);

module.exports = router;