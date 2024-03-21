const express = require('express');
const router = express.Router();
const BootcampRoutes = require('./bootcamp-routes');
const CourseRoutes = require('./course-routes');
const AuthRoutes= require('./auth-routes');

router.use('/bootcamps',BootcampRoutes);
router.use('/courses',CourseRoutes);
router.use('/auth',AuthRoutes);
module.exports = router;