const router = require('express').Router(),
auth = require('../../../auth'),
middle_schools_controller = require('../controllers/middleSchools.controller');


router.post('/', auth.optional, middle_schools_controller.createMiddleSchool);

router.get('/', auth.optional, middle_schools_controller.getAllMiddleSchools);

router.get('/:id', auth.optional, middle_schools_controller.getMiddleSchoolById);

module.exports = router;