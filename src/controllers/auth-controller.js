const { StatusCodes }= require('http-status-codes');
const { BootcampService } = require('../services');
const { SuccessResponse , ErrorResponse } = require('../utils/common');
const AppError = require('../utils/error/app-error');
const { AuthService } = require('../services');


async function registerUser(request,response){
    try {
        const user = await AuthService.registerUser(request);
        const token = user.getSignedWebToken();
        SuccessResponse.data = user;
        SuccessResponse.token = token;
        return response.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log(error);
        ErrorResponse.data = error;
        ErrorResponse.message = error.message;
        return response.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}

async function loginUser(request,response){
    try {
        const user = await AuthService.loginUser(request);
        const token = user.getSignedWebToken();
        SuccessResponse.token = token;
        return response.status(StatusCodes.OK).json(SuccessResponse);
        
    } catch (error) {
        console.log(error);
        ErrorResponse.data = error;
        ErrorResponse.message = error.message;
        return response.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}

module.exports={
    registerUser,
    loginUser,
}