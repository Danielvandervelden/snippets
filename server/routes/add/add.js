const express = require('express');
const router = express.Router();

const addController = require('../../controllers/add');

router.use('/category', addController.category);
router.use('/snippet', addController.snippet);

module.exports = router;