const mongoose  = require('mongoose');


const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Please enter a name'],

    },
    email : {
        type :String,
        match : [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,'Please enter a valid email'],
        required : [true, 'Please enter a valid email'],
        unique: true,
    },
    role : {
        type: String,
        enum : ['user','publisher'],
        default : 'user'
    },
    password : {
        type : String,
        required : [true,'Please enter a password'],
        select :false,
        minlength : 6,
    },
    resetPasswordToken : true,
    resetPasswordExpire : true,
    createdAt : {
        type : Date,
        default : Date.now,
    }
});

module.exports = mongoose.model('User',UserSchema);