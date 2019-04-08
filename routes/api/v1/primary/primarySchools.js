const router = require('express').Router(),
auth = require('../../../auth'),
primary_schools_controller = require('../controllers/primarySchools.controller');


router.post('/', auth.optional, primary_schools_controller.createPrimarySchool);

router.get('/', auth.optional, primary_schools_controller.getAllPrimarySchools);

router.get('/:id', auth.optional, primary_schools_controller.getPrimarySchoolById);

module.exports = router;