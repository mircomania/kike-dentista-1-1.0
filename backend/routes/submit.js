const express = require('express');
const router = express.Router();

const controller = require('../controllers/submitController');

router.post('/submit', controller.submitForm);

module.exports = router;
