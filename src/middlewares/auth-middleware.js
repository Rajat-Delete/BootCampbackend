const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/error/app-error");
const { ErrorResponse } = require("../utils/common");
const jwt = require('jsonwebtoken');
const { ServerConfig } = require("../config");
const User = require('../models/users');

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
            ErrorResponse.error = new AppError(`Please enter a valid EmailId`,StatusCodes.BAD_REQUEST);
            return response.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }
        next();
}

async function verifyProtectedRoutes(request,response,next){
    try {
        console.log('In verify routes');
        console.log(request.headers);
        let token;
        if(request.headers.authorization && request.headers.authorization.startsWith('Bearer')){
            console.log('Inside here');
            token = request.headers.authorization.split(' ')[1];
            console.log('token>>',token);
        }
        // else if(request.cookies.token){
        //     token = request.cookies.token;
        // }

        //ensure token exists in the request
        if(!token){
            ErrorResponse.error = new AppError(`Token was Missing in the Incoming Request.`,StatusCodes.UNAUTHORIZED);
            ErrorResponse.message = 'Please enter a Valid Token';
            return response.status(StatusCodes.UNAUTHORIZED).json(ErrorResponse);
        }

        //verify the token 
        console.log('token',token);
        try{
            const decoded = jwt.verify(token,ServerConfig.JWT_SECRET_KEY);

            console.log('payload>>',decoded);

            request.user= await User.findById(decoded.id);

        }catch(error){
            ErrorResponse.error = new AppError(`Not Authorised to access this route.`,StatusCodes.UNAUTHORIZED);
            ErrorResponse.message = 'Not Authorised to access this route';
            return response.status(StatusCodes.UNAUTHORIZED).json(ErrorResponse);
        
        }
        next();
    } catch (error) {
        
    }
}


//grant access to specific roles
function authorize(request,response,next){
    //roles which have access to update or create resources
    const roles = ['publisher','admin'];
    if(!roles.includes(request.user.role)){
        ErrorResponse.error = new AppError(`User role ${request.user.role} is not authorized to access this route`,StatusCodes.UNAUTHORIZED);
        ErrorResponse.message = 'Not Authorised to access this route';
        return response.status(StatusCodes.UNAUTHORIZED).json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateEmailPassword,
    verifyProtectedRoutes,
    authorize,
}