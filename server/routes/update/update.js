const express = require('express');
const router = express.Router();

const userController = require('../../controllers/update');

router.use('/category', userController.category);
router.use('/snippet', userController.snippet);
router.use('/snippet_count_in_category', userController.snippet_count_in_category);

module.exports = router;