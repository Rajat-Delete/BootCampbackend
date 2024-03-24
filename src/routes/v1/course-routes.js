const express = require('express');
const {CourseController}  =require('../../controllers')
const router = express.Router({mergeParams : true});
const {Validators} = require('../../utils/common');
const {AuthMiddleware} = require('../../middlewares');


//if user is hitting /api/v1/bootcamp/:bootcampId/courses then we will be fetching the courses as per bootcamps
//else will be will be reffering to /api/v1/courses,
router.get('/',CourseController.getCourses);
router.put('/:id',Validators.validateIdPresent,Validators.validateObject,AuthMiddleware.verifyProtectedRoutes,AuthMiddleware.authorize,CourseController.updateCourseById);
router.delete('/:id',Validators.validateIdPresent,Validators.validateObject,AuthMiddleware.verifyProtectedRoutes,AuthMiddleware.authorize,CourseController.deleteCourseById);
router.post('/',AuthMiddleware.verifyProtectedRoutes,AuthMiddleware.authorize,CourseController.postCourses);
router.get('/:id',Validators.validateIdPresent,Validators.validateObject,CourseController.getCoursesById);

module.exports = router;