const express = require('express');
const router = express.Router();
const BootcampRoutes = require('./bootcamp-routes');

router.use('/bootcamps',BootcampRoutes);

module.exports = router;