const express = require('express');
const router = express.Router();

const { getBanner } = require('../controllers/bannerController');

router.get('/banner', getBanner);

module.exports = router;
