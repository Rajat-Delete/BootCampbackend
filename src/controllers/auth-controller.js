const { StatusCodes }= require('http-status-codes');
const { BootcampService } = require('../services');
const { SuccessResponse , ErrorResponse } = require('../utils/common');
const AppError = require('../utils/error/app-error');


async function registerUser(request,response){
    try {
        return response.status(StatusCodes.OK).json({'Message' : 'API is live'});
    } catch (error) {
        console.log(error);
    }
}

module.exports={
    registerUser,
}