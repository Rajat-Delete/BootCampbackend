const { StatusCodes }= require('http-status-codes');
const { BootcampService } = require('../services');
const { SuccessResponse , ErrorResponse } = require('../utils/common');
const AppError = require('../utils/error/app-error');

//Access : Public
async function getBootcamps(request,response){
    try{
        const bootcamps = await BootcampService.getAllBootcamps(request,response);
        console.log('bootcamps in controller',bootcamps);
        //adding a check to find all the incoming bootcamps from the database
        if(bootcamps.length  === 0){
            //No bootcamp exits in the database
            throw new AppError(`No bootcamps exits`,StatusCodes.NOT_FOUND);
        }   
        //since this count was added to every bootcamp as we are passing the reference of the object
        let finalresponse = {};
        finalresponse.success = "true";
        finalresponse.message = "Successfully completed the request";
        finalresponse.pagination = bootcamps.pagination;
        //now we need to remove pagination from bootcamp
        delete bootcamps['pagination'];
        finalresponse.data = bootcamps;
        finalresponse.error = {};
        //adding the count of the bootcamps in the API
        finalresponse.count = bootcamps.length;
        console.log(finalresponse);
        return response.status(StatusCodes.OK).json(finalresponse);
    }catch(error){
        ErrorResponse.data = error;
        ErrorResponse.message = error.message;
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
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
        console.log('SuccessResponse in get',SuccessResponse);
        return response.status(StatusCodes.OK).json(SuccessResponse);
    }catch(error){
        console.log(error);
        ErrorResponse.data = error;
        ErrorResponse.message = error.message;
        //console.log(error.status);
        return response.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
    }
}


//Access : Public
async function postBootcamps(request,response){
    try{
        const bootcamp = await BootcampService.postBootcamp(request.body);
        SuccessResponse.data = bootcamp;
        return response.status(StatusCodes.CREATED).json(SuccessResponse);
    }catch(error){
        console.log('e>>>>',error);
        //checking for duplicate bootcamps name
        //console.log(typeof error.code);
        if(error.code == '11000'){
            console.log('Inside duplicate key code');
            ErrorResponse.message = error.message;
            ErrorResponse.error = new AppError(`Duplicate value has been passed in the Incoming request`,StatusCodes.BAD_REQUEST);
            return response.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }
        //checking for validation error
        /*console.log(Object.keys(Object.values(error.errors)[0]));
        if(error.code){

        }*/

        ErrorResponse.error = error;
        ErrorResponse.message = error.message;
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

//Access : Public
async function putBootcampsById(request,response){
    try{
        const bootcamp = await BootcampService.updateBootcampById(request);
        console.log('bootcamp in update bootcamp ',bootcamp);
        if(!bootcamp){
            throw new AppError(`No Bootcamp found with the Id ${request.params.id}`,StatusCodes.NOT_FOUND);
        }
        SuccessResponse.data = bootcamp;
        return response.status(StatusCodes.OK).json(SuccessResponse);
    }catch(error){
        console.log(error);
        ErrorResponse.error = error;
        return response.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
    }
}

//Access : Public
async function deleteBootcampsById(request,response){
    try{
        const bootcamp = await BootcampService.deleteBootcampsById(request.params.id);
        if(!bootcamp){
            throw new AppError(`No Bootcamp found with the given id ${request.params.id}`,StatusCodes.NOT_FOUND);
        }
        SuccessResponse.data = bootcamp;
        return response.status(StatusCodes.OK).json(SuccessResponse);
    }catch(error){
        console.log(error);
        ErrorResponse.error = error;
        return response.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}

//Access : Private
async function getBootcampsWithinRadius(request,response){
    try {
        const {zipcode , distance} = request.params;
        //console.log('zipcode',zipcode,'radius:',distance);
        const bootcamps = await BootcampService.getBootcampsWithinRadius({zipcode , distance});
        //checking if there is no bootcamp for the given scenario
        if(!bootcamps){
            //throw new app error
            throw new AppError(`No Bootcamps exits for the given criteria`,StatusCodes.NOT_FOUND);
        }
        let finalresponse = {};
        finalresponse.success = "true";
        finalresponse.message = "Successfully completed the request";
        finalresponse.data = bootcamps;
        finalresponse.error = {};
        //adding the count of the bootcamps in the API
        finalresponse.count = bootcamps.length;
        return response.status(StatusCodes.OK).json(finalresponse);
    } catch (error) {
        console.log('error in getbootcamps with in radius',error);
        ErrorResponse.error = error;
        ErrorResponse.message = error.message;
        return response.status(error.statusCode).json(ErrorResponse);
    }
}


async function uploadBootcampPhoto(request,response){
    try {
        const bootcamp = await BootcampService.uploadBootcampPhoto(request);
        console.log('bootcamp coming after service',bootcamp);
        SuccessResponse.data = bootcamp;
        return response.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error= error;
        ErrorResponse.message = error.message;
        return response.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}

module.exports = {
    getBootcamps,
    getBootcampsById,
    postBootcamps,
    putBootcampsById,
    deleteBootcampsById,
    getBootcampsWithinRadius,
    uploadBootcampPhoto,
}