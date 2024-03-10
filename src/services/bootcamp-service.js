const { StatusCodes } = require('http-status-codes');
const Bootcamp = require('../models/bootcamps');
const geocoder = require('../utils/common/geocoder');

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

async function getAllBootcamps(){
    try{
        const bootcamps = await Bootcamp.find();
        return bootcamps;
    }catch(error){
        throw error;
    }
}

async function getBootcampById(id){
    try {
        const bootcamp = await Bootcamp.findById(id);
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
        const bootcamp = await Bootcamp.findByIdAndDelete(id);
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
        console.log('loc',loc);
        console.log('latitude',latitude,'longitude',longitude);

        //calulating the radius 
        //divide distance by radius of earth
        //radius of earth is 3963 miles / 6378 km

        const radius = distance/3963;
        console.log(longitude,"--",latitude,"--",radius,"--",distance,"--")
        const bootcamps = await Bootcamp.find({
            location : { $geoWithin: { $centerSphere: [ [ longitude, latitude ], radius ] }}
            });
        return bootcamps;
    } catch (error) {
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
}