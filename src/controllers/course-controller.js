const { StatusCodes } = require('http-status-codes');
const { SuccessResponse , ErrorResponse } = require('../utils/common');
const AppError = require('../utils/error/app-error');
const {CourseService} = require('../services')

async function getCourses(request,response){
    try {
        console.log('request in controller',request.params.bootcampId);
        const courses = await CourseService.getCourses(request.params.bootcampId);
        console.log('courses in controller',courses);
        if(!courses){
            //then throw custom error here
        }
        let finalresponse = {};
        finalresponse.success = true;
        finalresponse.message = 'Successfully completed the request';
        finalresponse.data = courses;
        finalresponse.count= courses.length;
        finalresponse.error = {};
        console.log('finalresponse',finalresponse);
        return response.status(StatusCodes.OK).json(finalresponse);
    } catch (error) {
        
    }
}


module.exports = {
    getCourses,
}