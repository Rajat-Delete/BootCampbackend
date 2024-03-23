const { StatusCodes }= require('http-status-codes');
const { BootcampService } = require('../services');
const { SuccessResponse , ErrorResponse } = require('../utils/common');
const AppError = require('../utils/error/app-error');
const { AuthService } = require('../services');
const { ServerConfig } = require('../config');
const User = require('../models/users');


async function registerUser(request,response){
    try {
        const user = await AuthService.registerUser(request);
        //const token = user.getSignedWebToken();
        //SuccessResponse.data = user;
        //SuccessResponse.token = token;
        //return response.status(StatusCodes.OK).json(SuccessResponse);
        sendTokenResponse(user,StatusCodes.OK,response);
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
        // const token = user.getSignedWebToken();
        //SuccessResponse.token = token;
        //return response.status(StatusCodes.OK).json(SuccessResponse);
        sendTokenResponse(user,StatusCodes.OK,response);
    } catch (error) {
        console.log(error);
        ErrorResponse.data = error;
        ErrorResponse.message = error.message;
        return response.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}


//get token from model,create cookie and send the resposne
//so we will be sending token in cookie as well

async function sendTokenResponse(user,statusCode,response){
    try {
        const token = user.getSignedWebToken();    

        const options = {
            expires : new Date(Date.now() + ServerConfig.JWT_COOKIE_EXPIRE*24*60*60*1000),
            httpOnly: true,
        }
        if(ServerConfig.NODE_ENV === 'production'){
            options.secure = true;
        }

        SuccessResponse.token = token;
        return response
        .status(statusCode)
        .cookie('token',token , options)
        .json(SuccessResponse);


    } catch (error) {
        console.log(error);
        ErrorResponse.data = error;
        ErrorResponse.message = error.message;
        return response.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}


//get current logged in user
async function getUser(request,response){
    try {
        const user = await User.findById(request.user.id);
        SuccessResponse.data = user;
        return response.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.data = error;
        return response.status(StatusCodes.BAD_REQUEST).status(ErrorResponse);
    }
}



module.exports={
    registerUser,
    loginUser,
    getUser,
}