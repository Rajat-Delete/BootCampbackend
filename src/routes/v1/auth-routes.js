const express = require('express');
const router = express.Router();
const {AuthController} = require('../../controllers');


router.post('/register',AuthController.registerUser);


module.exports = router;