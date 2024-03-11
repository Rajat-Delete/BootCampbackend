const mongoose = require('mongoose');


const CourseSchema = new mongoose.Schema({
    title : {
        type : String,
        trim : true,
        required : [true,'Please enter a title for the course']
    },
    description : {
        type : String,
        required : [true , 'Please add a description for the course']
    },
    weeks : {
        type : Number,
        required : [true , 'Please enter duration of the course']
    },
    tuition : {
        type : Number,
        required : [true , 'Please enter tution fees for the course']
    },
    minimumSkill : {
        type : String,
        required : [true , 'Please enter minimum skill for the course'],
        enum : ['beginner', 'intermediate', 'advance'],
    },
    scholarhipsAvailable : {
        type : Boolean,
        default : false,
    },
    createdAt : {
        type : Date,
        default :Date.now(),
    },
    bootcamp: {
        type : mongoose.Schema.ObjectId,
        ref : 'Bootcamp',
        required : true,
    }


})

module.exports = mongoose.model('Course', CourseSchema);