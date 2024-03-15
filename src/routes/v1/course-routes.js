const express = require('express');
const {CourseController}  =require('../../controllers')
const router = express.Router({mergeParams : true});
const {Validators} = require('../../utils/common')

//if user is hitting /api/v1/bootcamp/:bootcampId/courses then we will be fetching the courses as per bootcamps
//else will be will be reffering to /api/v1/courses,
router.get('/',CourseController.getCourses);
router.put('/:id',Validators.validateIdPresent,Validators.validateObject,CourseController.updateCourseById);
router.delete('/:id',Validators.validateIdPresent,Validators.validateObject,CourseController.deleteCourseById);
router.post('/',CourseController.postCourses);
router.get('/:id',Validators.validateIdPresent,Validators.validateObject,CourseController.getCoursesById);

module.exports = router;