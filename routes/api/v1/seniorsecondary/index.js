
const express = require('express');
const router = express.Router();


router.use('/seniorsecondaryschools', require('./seniorSecondarySchools'));

module.exports = router;