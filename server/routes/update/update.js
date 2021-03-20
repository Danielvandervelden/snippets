const express = require('express');
const router = express.Router();

const userController = require('../../controllers/update');

router.use('/category', userController.category);
router.use('/snippet', userController.snippet);

module.exports = router;