//logic is to take all the data from the _data folder and create a new connection and then insert the data in DB

const mongoose = require('mongoose');
const Bootcamp = require('../models/bootcamps');
const Course = require('../models/courses');
const User = require('../models/users');
const fs = require('fs');
const dotenv = require('dotenv');
const path = require('path');

//loading the environment variables;
dotenv.config({path : '../../.env'});
console.log(process.env);

//connection to DB
const conn = mongoose.connect(process.env.MONGO_URI);
console.log('Database connected');

//loading the bootcamps,courses data from _data folder
const data  = JSON.parse(fs.readFileSync(path.join(__dirname,'..','_data','bootcamps.json')));
const coursedata  = JSON.parse(fs.readFileSync(path.join(__dirname,'..','_data','courses.json')));
const usersdata  = JSON.parse(fs.readFileSync(path.join(__dirname,'..','_data','users.json')));
//console.log('data is',data);


async function importData(){
    try{
        await Bootcamp.insertMany(data);
        await Course.create(coursedata);
        await User.create(usersdata);
        console.log('data inserted successfully');
        process.exit();
    }catch(error){
        console.log('Error occured while inserting bootcamps data into DB',error);
    }
}

async function deleteData(){
    try{
        await Bootcamp.deleteMany();
        await Course.deleteMany();
        await User.deleteMany();
        console.log('data deleted successfully');
        process.exit();
    }catch(error){
        console.log('Error occured while inserting bootcamps data into DB',error);
    }
}

if(process.argv[2] === '-i'){
    importData();
}else if(process.argv[2] === '-d'){
    deleteData();
}

