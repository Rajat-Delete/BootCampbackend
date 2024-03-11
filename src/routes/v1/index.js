const express = require('express');
const router = express.Router();
const BootcampRoutes = require('./bootcamp-routes');
const CourseRoutes = require('./course-routes');

router.use('/bootcamps',BootcampRoutes);
router.use('/courses',CourseRoutes);
module.exports = router;