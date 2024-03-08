const { StatusCodes } = require('http-status-codes');
const Bootcamp = require('../models/bootcamps');

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

module.exports ={
    postBootcamp,
    getAllBootcamps,
    getBootcampById,
    updateBootcampById,
    deleteBootcampsById,
}