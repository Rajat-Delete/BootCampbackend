const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/error/app-error");
const { ErrorResponse } = require("../utils/common");

async function validateEmailPassword(request,response,next){
        const {email, password} = request.body;
        if(!email || !password){
            ErrorResponse.message = 'Please enter a valid Emailid and Password';
            ErrorResponse.error = new AppError(`Please Provide an EmailId and Password`,StatusCodes.BAD_REQUEST);
            return response.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }
        //validating the email 
        //console.log(email , password);
        console.log('1>>',!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/));
        if(!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)){
            ErrorResponse.message = 'Please enter a valid EmailId';
            ErrorResponse.data = new AppError(`Please enter a valid EmailId`,StatusCodes.BAD_REQUEST);
            return response.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }
        next();
}

module.exports = {
    validateEmailPassword,
}