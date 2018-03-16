const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check');
const {matchedData, sanitize} = require('express-validator/filter');
const api_utils = require('../utils/api_utils');
const user = require('../models/user');
const resetcode = require('../models/reset_code');

router.get('/home', function (req, res, next) {
    res.json({progressed: true});
});




module.exports = router;
