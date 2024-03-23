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
        user.password = undefined;
        console.log(user);
        return user;
    } catch (error) {
        throw error;
    }
}


async function loginUser(request){
    try {
        const {email, password} = request.body;

        //checking if the user exists 
        const user = await User.findOne({ email }).select('+password');

        //since we have select password as false in model so here add select

        if(!user){
            throw new AppError(`Invalid credentials`,StatusCodes.UNAUTHORIZED);
        }

        //compare passwords
        const isMatch = await user.comparePassword(password);

        if(!isMatch){
            throw new AppError('Invalid credentials',StatusCodes.UNAUTHORIZED);
        }

        return user;

    } catch (error) {
        throw error;
    }
}

module.exports = {
    registerUser,
    loginUser,
}