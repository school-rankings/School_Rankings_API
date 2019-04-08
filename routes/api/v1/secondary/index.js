
const express = require('express');
const router = express.Router();


router.use('/secondaryschools', require('./secondarySchools'));

module.exports = router;