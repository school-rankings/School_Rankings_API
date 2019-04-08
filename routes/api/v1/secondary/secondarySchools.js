const router = require('express').Router(),
auth = require('../../../auth'),
secondary_schools_controller = require('../controllers/secondarySchool.controller');


router.post('/', auth.optional, secondary_schools_controller.createSecondarySchool);

router.get('/', auth.optional, secondary_schools_controller.getAllSecondarySchools);

router.get('/:id', auth.optional, secondary_schools_controller.getSecondarySchoolById);

module.exports = router;