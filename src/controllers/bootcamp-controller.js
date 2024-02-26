const { StatusCodes }= require('http-status-codes');
const { BootcampService } = require('../services');
const { SuccessResponse , ErrorResponse } = require('../utils/common');
const AppError = require('../utils/error/app-error');

//Access : Public
async function getBootcamps(request,response){
    try{
        const bootcamps = await BootcampService.getAllBootcamps();
        SuccessResponse.data =bootcamps;
        return response.status(StatusCodes.OK).json(SuccessResponse);
    }catch(error){
        ErrorResponse.data = error;
        ErrorResponse.message = error.message;
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

//Access : Public
async function getBootcampsById(request,response){
    try{
        const bootcamp = await BootcampService.getBootcampById(request.params.id);
        console.log(`Bootcamp coming in getBootcamp by id is ${bootcamp}`);
        if(!bootcamp){
            console.log('inside')
           throw new AppError(`No Bootcamp found with the given Id ${request.params.id}`,StatusCodes.NOT_FOUND);
        }
        SuccessResponse.data = bootcamp;
        response.status(StatusCodes.OK).json(SuccessResponse);
    }catch(error){
        console.log(error);
        ErrorResponse.data = error;
        ErrorResponse.message = error.message;
        response.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
    }
}


//Access : Public
async function postBootcamps(request,response){
    try{
        const bootcamp = await BootcampService.postBootcamp(request.body);
        SuccessResponse.data = bootcamp;
        return response.status(StatusCodes.CREATED).json(SuccessResponse);
    }catch(error){
        console.log(error);
        ErrorResponse.error = error;
        ErrorResponse.message = error.message;
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

//Access : Public
async function putBootcampsById(request,response){
    try{
        //as of now not hitting the service call, just sending the stubbed response
        response.status(StatusCodes.OK).json({success : true , Message : `Put Bootcamp with Id :${request.params.id}`});
    }catch(error){
        console.log(error);
    }
}

//Access : Public
async function deleteBootcampsById(request,response){
    try{
        //as of now not hitting the service call, just sending the stubbed response
        response.status(StatusCodes.OK).json({success : true , Message : `Delete Bootcamp with Id :${request.params.id}`});
    }catch(error){
        console.log(error);
    }
}

module.exports = {
    getBootcamps,
    getBootcampsById,
    postBootcamps,
    putBootcampsById,
    deleteBootcampsById,
}