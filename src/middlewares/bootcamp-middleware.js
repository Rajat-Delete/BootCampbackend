const AppError = require('../utils/error/app-error')
const {ErrorResponse}  = require('../utils/common');
const { StatusCodes } = require('http-status-codes');

function validateObject(request,response,next){
    //console.log (request.params.id);
    if(!request.params.id.match((/^[0-9a-fA-F]{24}$/))){
        //it is not a valid object Id
        ErrorResponse.message = 'Please enter a valid ObjectId';
        ErrorResponse.error = new AppError({'Explanation' : 'Invalid ObjectId was found in the Incoming request'},StatusCodes.BAD_REQUEST);
        return response.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateObject,
}