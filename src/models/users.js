const mongoose  = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ServerConfig } = require('../config');

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
    resetPasswordToken : String,
    resetPasswordExpire : Date,
    createdAt : {
        type : Date,
        default : Date.now,
    }
});

//Encrypting the password using bcrypt
UserSchema.pre('save', async function(){
    //generating the salt for the password, max the salt stronger will the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
});

//signin JWT and return
UserSchema.methods.getSignedWebToken = function(){
    return jwt.sign({id : this._id} ,ServerConfig.JWT_SECRET_KEY , {
        expiresIn : ServerConfig.JWT_EXPIRE
    })
}

//comparing the Incoming passwords with the passwords in DB
UserSchema.methods.comparePassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword , this.password);
}



module.exports = mongoose.model('User',UserSchema);