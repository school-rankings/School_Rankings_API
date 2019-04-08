const router = require('express').Router(),
auth = require('../../../auth'),
senior_secondary_schools_controller = require('../controllers/seniorSecondarySchool.controller');


router.post('/', auth.optional, senior_secondary_schools_controller.createSeniorSecondarySchool);

router.get('/', auth.optional, senior_secondary_schools_controller.getAllSeniorSecondarySchools);

router.get('/:id', auth.optional, senior_secondary_schools_controller.getSeniorSecondarySchoolById);

module.exports = router;