const express = require('express');
const router = express.Router();
const detailRoute = require('../../controller/log');

router.use('/log', detailRoute);

module.exports = router;
