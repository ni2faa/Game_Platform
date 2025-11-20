const express = require('express');
const { getAllAssets } = require('../controllers/assetController');
const { isAuthenticatedWithMockToken } = require('../middlewares/user_actions/mockAuth');

const router = express.Router();

router.route('/assets').get(isAuthenticatedWithMockToken, getAllAssets);

module.exports = router;

