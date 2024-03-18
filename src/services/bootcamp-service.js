const { StatusCodes } = require('http-status-codes');
const Bootcamp = require('../models/bootcamps');
const Course = require('../models/courses');
const geocoder = require('../utils/common/geocoder');
const AppError = require('../utils/error/app-error');
const { ServerConfig } = require('../config');
const path = require('path');

async function postBootcamp(data){
    try{
        const bootcamp = await Bootcamp.create(data);
        return bootcamp;
    }catch(error){
        //console.log('error in service',error);
        //checking for duplicate error message
        throw error;
    }
}

async function getAllBootcamps(request,response){
    try{
        //console.log(request.query);
        let query;

        //copy request query
        const reqQuery = { ...request.query };

        //removing the fields which are not needed for api find call
        const removeFields = ['select','sort','limit','page'];

        removeFields.forEach(param => delete reqQuery[param])
        console.log('reqQuery afetr remove fields',reqQuery);

        //making query string so that we can replace any lte|lt|gte|gt|in with $ infront of them
        let queryString = JSON.stringify(reqQuery);



        queryString = queryString.replace(/\b(lt|lte|gt|gte|in)\b/g,match => `$${match}`)
        console.log(`queryString after is ${queryString}`);

        query = Bootcamp.find(JSON.parse(queryString)).populate('courses');

        //selecting the fields post befor executing the query
        if(request.query.select){
           const selectBy = request.query.select.split(',').join(" ");
           query.select(selectBy);
        }

        //sorting the fields as per api inputs else sorting as per the default inputs dates
        if(request.query.sort){
            const sortby  = request.query.sort.split(',').join(" ");
            query.sort(sortby);
        }else{
            query.sort('-createdAt');
        }
        //adding the pagination code
        const page = parseInt(request.query.page,10) || 1;
        const limit  = parseInt(request.query.limit,10) || 10;
        const startIndex = (page-1)*limit;
        const endIndex = page * limit;
        const total = await Bootcamp.countDocuments();
        console.log('page--',page,'limit--',limit,'startIndex--',startIndex,'endIndex--',endIndex);
       
        //pagination result
        const pagination = {};

        if(endIndex < total){
            pagination.next = {
                page :page + 1,
                limit
            }
        }

        if(startIndex > 0){
            pagination.previous = {
                page : page-1,
                limit,
            }
        }

        query = query.skip(startIndex).limit(limit);

        console.log('pagination',pagination);
        console.log('bootcamps',query);

        const bootcamps = await query;
        bootcamps.pagination = pagination;
        return bootcamps;
    }catch(error){
        throw error;
    }
}

async function getBootcampById(id){
    try {
        const bootcamp = await Bootcamp.findById(id).populate('courses');
        return bootcamp;
    } catch (error) {
        throw error;
    }
}

async function updateBootcampById(request){
    try {
        const bootcamp = await Bootcamp.findByIdAndUpdate(request.params.id , request.body , {
            new : true,
            runValidators : true,
        });
        //console.log('bootcamp in update bootcamp',bootcamp);
        return bootcamp;
    } catch (error) {
        throw error;
    }
}

async function deleteBootcampsById(id){
    try {
        //await Bootcamp.findById(id);
        const bootcamp = await Bootcamp.findById(id);
        if(!bootcamp){
            throw new AppError(`No Bootcamp found for the Given Id`,StatusCodes.NOT_FOUND);
        }

        //Since the prehook for the remove is not working so explicity deleting the records of courses first and then deleting the bootcamp
        await Course.deleteMany({bootcamp : id});
        await Bootcamp.deleteOne({_id : id});
        return bootcamp;
    } catch (error) {
        throw error;
    }
}


async function getBootcampsWithinRadius(data){
    try {
        const {zipcode , distance} = data;
        //console.log('zipcode',zipcode,'radius',distance);
        const loc = await geocoder.geocode(zipcode);
        const latitude = loc[0].latitude;
        const longitude = loc[0].longitude;
        //console.log('loc',loc);
        //console.log('latitude',latitude,'longitude',longitude);

        //calulating the radius 
        //divide distance by radius of earth
        //radius of earth is 3963 miles / 6378 km

        const radius = distance/3963;
        console.log(longitude,"--",latitude,"--",radius,"--",distance,"--")
        const bootcamps = await Bootcamp.find({
            location : { $geoWithin: { $centerSphere: [ [ longitude, latitude ], radius ] }}
            });
        console.log('Bootcamps in area are',bootcamps);
        return bootcamps;
    } catch (error) {
        throw error;
    }
}


async function uploadBootcampPhoto(data){
    try {
        console.log(data.params.bootcampId);
        const bootcamp = await Bootcamp.findById(data.params.bootcampId);
        //check for the bootcamp id present or not
        if(!bootcamp){
            throw new AppError(`No bootcamp exist with the given Id ${data.params.bootcampId}`,StatusCodes.BAD_REQUEST);
        }
        //checking if the user has attached a photo or not
        if(!data.files){
            throw new AppError(`No files was found in the incoming request`,StatusCodes.BAD_REQUEST);
        }
        //checking if the file exist is a valid Image type or not
        console.log(data.files.File);
        if(!data.files.File.mimetype.startsWith('image')){
            throw new AppError(`Please upload a valid Image for the BootCamp`,StatusCodes.BAD_REQUEST);
        }

        //checking the size of the Image
        if(data.files.File.size > ServerConfig.BOOTCAMP_PHOTO_SIZE){
            throw new AppError(`Please upload Image with size less than ${ServerConfig.BOOTCAMP_PHOTO_SIZE}`,StatusCodes.BAD_REQUEST);
        }

        //renaming the image so that bootcamp photos cannot be overrided
        const imageName =  `image_${data.params.bootcampId}${path.parse(data.files.File.name).ext}`;
        console.log(imageName);
        data.files.File.name = imageName;

        const fileuploadPath = path.join(__dirname,'..','public','uploads');
        // require('../public/uploads');

        //let updatedBootcamp;
        //writing the code for moving the uploaded image in public folder and later adding it as static 
        data.files.File.mv(`${fileuploadPath}/${imageName}`, async error=>{
            console.log(`error while file upload`,error);
            if(error){
                throw new AppError(`Something went wrong while uploading the file`,StatusCodes.INTERNAL_SERVER_ERROR);
            }

            await Bootcamp.findByIdAndUpdate(data.params.bootcampId , {'photo' : imageName});
            //updatedBootcamp = await Bootcamp.findById(data.params.bootcampId);
            console.log('1>>',updatedBootcamp);
        });
        return 'File Uploaded Successfully';
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports ={
    postBootcamp,
    getAllBootcamps,
    getBootcampById,
    updateBootcampById,
    deleteBootcampsById,
    getBootcampsWithinRadius,
    uploadBootcampPhoto,
}