const { StatusCodes } = require('http-status-codes');
const { SuccessResponse , ErrorResponse } = require('../utils/common');
const AppError = require('../utils/error/app-error');
const {CourseService} = require('../services');

async function getCourses(request,response){
    try {
        //this value was not populating , need to check
        console.log('request in controller::',request.params.bootcampId);
        const courses = await CourseService.getCourses(request.params.bootcampId);
        //console.log('courses in controller',courses);
        if(courses.length === 0){
            //then throw custom error here
            throw new AppError(`No Courses exists`,StatusCodes.NOT_FOUND);
        }
        let finalresponse = {};
        finalresponse.success = true;
        finalresponse.message = 'Successfully completed the request';
        finalresponse.data = courses;
        finalresponse.count= courses.length;
        finalresponse.error = {};
        //console.log('finalresponse',finalresponse);
        return response.status(StatusCodes.OK).json(finalresponse);
    } catch (error) {
        console.log('error while fetching courses');
        ErrorResponse.message = error.message;
        ErrorResponse.data = error;
        return response.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}

async function getCoursesById(request,response){
    try {
        const course = await CourseService.getCoursesById(request.params.id);
        if(!course){
            throw new AppError(`No Course Exists for the given CourseId`,StatusCodes.NOT_FOUND);
        }
        SuccessResponse.data = course;
        return response.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        ErrorResponse.message = error.message;
        return response.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}

async function postCourses(request,response){
    try {
        request.body.bootcamp = request.params.bootcampId;
        console.log('request body is',request.body);
        const course = await CourseService.postCourses(request.body);
        if(!course){
            throw new AppError(`Something went wrong while creating course`,StatusCodes.BAD_REQUEST);
        }
        SuccessResponse.data = course;
        return response.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        console.log('error in controller::',error);
        ErrorResponse.error = error;
        ErrorResponse.message = error.message;
        return response.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}

async function updateCourseById(request,response){
    try {
        const course = await CourseService.putCoursesById(request);
        if(!course){
            throw new AppError(`No Course Exists for the given CourseId`,StatusCodes.OK);
        }
        SuccessResponse.data = course;
        return response.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log('error in controller::',error);
        ErrorResponse.error = error;
        ErrorResponse.message = error.message;
        return response.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}

async function deleteCourseById(request,response){
    try {
        console.log(' in deleteCourseById')
        const course = await CourseService.deleteCoursesById(request.params.id);
        if(!course){
            throw new AppError(`No Course Exists for the given CourseId`,StatusCodes.OK);
        }
        SuccessResponse.data = course;
        return response.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log('error in controller::',error);
        ErrorResponse.error = error;
        ErrorResponse.message = error.message;
        return response.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}

module.exports = {
    getCourses,
    getCoursesById,
    postCourses,
    updateCourseById,
    deleteCourseById,
}