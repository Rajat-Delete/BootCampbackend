const express = require('express');
const { BootCampController } = require('../../controllers');
const {Validators} = require('../../utils/common')
const CourseRouter = require('./course-routes');
const {AuthMiddleware} = require('../../middlewares');

const router = express.Router();
//Include other resource routers
router.use('/:bootcampId/courses',Validators.validateBootcampObject,CourseRouter);

router.put('/:bootcampId/photo',AuthMiddleware.verifyProtectedRoutes,AuthMiddleware.authorize,Validators.validateBootcampObject,BootCampController.uploadBootcampPhoto)

router.get('/' ,BootCampController.getBootcamps);

router.get('/:id',Validators.validateObject ,BootCampController.getBootcampsById);

router.post('/' ,AuthMiddleware.verifyProtectedRoutes,AuthMiddleware.authorize,BootCampController.postBootcamps);

router.put('/:id' ,Validators.validateObject,AuthMiddleware.verifyProtectedRoutes,AuthMiddleware.authorize,BootCampController.putBootcampsById);

router.delete('/:id' ,Validators.validateObject,AuthMiddleware.verifyProtectedRoutes,AuthMiddleware.authorize,BootCampController.deleteBootcampsById);

router.get('/radius/:zipcode/:distance',BootCampController.getBootcampsWithinRadius);

module.exports = router;