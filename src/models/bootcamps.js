const mongoose = require('mongoose');
const slugify = require('slugify');

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

})

BootcampSchema.pre('save', function(next){
    console.log('slugify ran');
    console.log(this);
    this.slug = slugify(this.name, {
        lower : true, //converts to lowercase , default value is false
    })
    next();
})

module.exports = mongoose.model('Bootcamp', BootcampSchema);