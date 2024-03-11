const express = require('express');
const {CourseController}  =require('../../controllers')
const router = express.Router();

//if user is hitting /api/v1/bootcamp/:bootcampId/courses then we will be fetching the courses as per bootcamps
//else will be will be reffering to /api/v1/courses,
router.get('/',CourseController.getCourses);

module.exports = router;