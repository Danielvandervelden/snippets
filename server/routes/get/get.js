const express = require('express');
const router = express.Router();

const getController = require('../../controllers/get');

router.use('/categories', getController.categories);
router.use('/snippets', getController.snippets);

module.exports = router;