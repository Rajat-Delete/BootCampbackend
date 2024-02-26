const { StatusCodes } = require('http-status-codes');
const Bootcamp = require('../models/bootcamps');
const { NOTFOUND } = require('dns');

async function postBootcamp(data){
    try{
        const bootcamp = await Bootcamp.create(data);
        return bootcamp;
    }catch(error){
        // console.log(error);
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

module.exports ={
    postBootcamp,
    getAllBootcamps,
    getBootcampById,
}