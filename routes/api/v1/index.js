
const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/schools', require('./schools'));
router.use('/preprimary', require('./preprimary'));
router.use('/primary', require('./primary'));
router.use('/middle', require('./middle'));
router.use('/secondary', require('./secondary'));
router.use('/seniorsecondary', require('./seniorsecondary'));
module.exports = router;