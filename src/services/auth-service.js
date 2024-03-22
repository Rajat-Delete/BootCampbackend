const { StatusCodes } = require('http-status-codes');
const User = require('../models/users');
const AppError = require('../utils/error/app-error');

async function registerUser(request){
    try {
        const {name,email,role,password} = request.body;
        const user = await User.create({
            name,
            email,
            role  ,
            password ,
        });
        return user;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    registerUser,
}