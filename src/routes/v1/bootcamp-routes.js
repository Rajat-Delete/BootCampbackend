const express = require('express');
const { BootCampController } = require('../../controllers');
const {Validators} = require('../../utils/common')
const CourseRouter = require('./course-routes');
const {AuthMiddleware} = require('../../middlewares');

const router = express.Router();
//Include other resource routers
router.use('/:bootcampId/courses',Validators.validateBootcampObject,CourseRouter);

router.put('/:bootcampId/photo',AuthMiddleware.verifyProtectedRoutes,Validators.validateBootcampObject,BootCampController.uploadBootcampPhoto)

router.get('/' ,BootCampController.getBootcamps);

router.get('/:id',Validators.validateObject ,BootCampController.getBootcampsById);

router.post('/' ,AuthMiddleware.verifyProtectedRoutes,BootCampController.postBootcamps);

router.put('/:id' ,Validators.validateObject,AuthMiddleware.verifyProtectedRoutes,BootCampController.putBootcampsById);

router.delete('/:id' ,Validators.validateObject,AuthMiddleware.verifyProtectedRoutes,BootCampController.deleteBootcampsById);

router.get('/radius/:zipcode/:distance',BootCampController.getBootcampsWithinRadius);

module.exports = router;