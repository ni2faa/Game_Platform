const express = require('express');
const { getAllAssets } = require('../controllers/assetController');

const router = express.Router();

router.route('/assets').get(getAllAssets);

module.exports = router;

