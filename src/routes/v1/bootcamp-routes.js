const express = require('express');
const { BootCampController } = require('../../controllers');
const {Validators} = require('../../utils/common')
const CourseRouter = require('./course-routes');

const router = express.Router();
//Include other resource routers
router.use('/:bootcampId/courses',Validators.validateBootcampObject,CourseRouter);

router.get('/' ,BootCampController.getBootcamps);

router.get('/:id',Validators.validateObject ,BootCampController.getBootcampsById);

router.post('/' ,BootCampController.postBootcamps);

router.put('/:id' ,Validators.validateObject,BootCampController.putBootcampsById);

router.delete('/:id' ,Validators.validateObject,BootCampController.deleteBootcampsById);

router.get('/radius/:zipcode/:distance',BootCampController.getBootcampsWithinRadius);

module.exports = router;