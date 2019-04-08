
const express = require('express');
const router = express.Router();


router.use('/primaryschools', require('./primarySchools'));

module.exports = router;