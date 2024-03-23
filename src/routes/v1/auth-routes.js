const express = require('express');
const router = express.Router();
const {AuthController} = require('../../controllers');
const  { AuthMiddleware } = require('../../middlewares');


router.post('/register',AuthController.registerUser);
router.post('/login',AuthMiddleware.validateEmailPassword,AuthController.loginUser);

module.exports = router;