const Course = require('../models/courses');

async function getCourses(data){

    if(data){
        //means /api/v1/bootcamp/:bootcampId/Courses is getting called 
        try {
            console.log('courses');
            const courses = await Course.find({bootcamp: data}).populate({
                path : 'bootcamp',
                select : 'name description',
            });
            console.log('courses as per bootcamp',courses);
            return courses;
        } catch (error) {
            throw error;
        }
    }else{
        try {
            console.log('courses as');
            const courses = await Course.find().populate({
                path : 'bootcamp',
                select : 'name description',
            });
            console.log('All course',courses);
            return courses;
        } catch (error) {
            throw error;
        }
    }
    
}

module.exports = {
    getCourses,
}