const mongoose = require('mongoose');
const slugify = require('slugify');
const {Geocoder} = require('../utils/common')

const BootcampSchema = new mongoose.Schema({
    name : {
        type : String,
        required :[true, 'Please enter a Name'],
        unique : true,
        trim : true,
        maxlength : [50 ,'Name cannot be more than 50 characters']
    },
    slug : String,
    description : {
        type : String,
        required : [true , 'Please add a description'],
        maxlength : [500, 'Description cannot be more than 500 characters']
    },
    webiste : {
        type : String ,
        match : [/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/ , 'Please enter a valid HTTP or HTTPS url']
    },
    phone : {
        type : String,
        maxlength : [20, 'PhoneNumber can be more than 20 characters']
    },
    email : {
        type : String,
        match : [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,'Please enter a valid email']
    },
    address :{
        type  : String,
        required : [true, 'Please enter a valid address']
    },
    location : {
        //GeoJSON Point
        type : {
            type : String,
            enum : ['Point'],
        },
        coordinates : {
            type : [Number],
            index : '2dsphere'
        },
        formattedAddress : String,
        street : String,
        city : String,
        state : String,
        zipcode : String,
        country : String,
    },
    careers : {
        type : [String],
        required :true,
        enums  :[
            'Web Development',
            'Mobile Development',
            'UI/UX',
            'Data Science',
            'Business',
            'Other'
        ]
    },
    averageRating : {
        type : String,
        min : [1, 'Rating cannot be less than 1'],
        max : [10, 'Rating cannnot be more than 10'],
    },
    averageCost : Number,
    photo :{
        type : String,
        default : 'no-photo.jpg'
    },
    housing : {
        type : Boolean,
        default : false,
    },
    jobAssistance : {
        type : Boolean,
        default : false,
    },
    jobGuarantee :{
        type  :Boolean ,
        default : false,
    },
    acceptGi : {
        type : Boolean,
        default : false,
    },
    createdAt : {
        type : Date,
        default : Date.now,
    }

},{
    //for virtuals
    toJSON : {virtuals : true},
    toObject : {virtuals : true},
})

//to make slug from the name of the bootcamp 
BootcampSchema.pre('save', function(next){
    console.log('slugify ran');
    console.log(this);
    this.slug = slugify(this.name, {
        lower : true, //converts to lowercase , default value is false
    })
    next();
})

//setting up the location data
BootcampSchema.pre('save',async function(){
    console.log('inside geocoder code');
    const res = await Geocoder.geocode(this.address);
    console.log(res);
    this.location = {
        type : 'Point',
        coordinates :[res[0].longitude,res[0].latitude],
        formattedAddress : res[0].formattedAddress,
        street : res[0].streetName,
        city : res[0].city,
        state : res[0].stateCode,
        zipcode : res[0].zipcode,
        country : res[0].countryCode,
    }
    //donot add the address in DB
    this.address = undefined;
})

//cascade delete the courses if bootcamps are deleted
BootcampSchema.pre('remove',async function cascadeDelete(next){
    console.log(`bootcamp getting removed from database is ${this._id}`);
    await this.model('Course').deleteMany({bootcamp : this._id});
    next();
})


//reverse populating the courses as per bootcamp
BootcampSchema.virtual('courses',{
    ref : 'Course',
    localField : '_id',
    foreignField : 'bootcamp',
    justOne : false,
})

module.exports = mongoose.model('Bootcamp', BootcampSchema);