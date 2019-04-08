
const express = require('express');
const router = express.Router();


router.use('/middleschools', require('./middleSchools'));

module.exports = router;