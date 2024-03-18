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

//creating a statics on course schema
//Statics are pretty much the same as methods , the difference is statics is available on the models directly while the methods are available on the model object
CourseSchema.statics.getAverageCost = async function(bootcampId){
    console.log(`Inside average cost function ${bootcampId}`);
    //console.log(this);
    const obj = await this.aggregate([
        {
            $match : {bootcamp : bootcampId}
        },
        {
            $group : {
                _id : bootcampId,
                averageCost : { $avg : '$tuition'}
            }
        }
    ]);
    console.log(obj);

    try {
        console.log('in update bootcamp');
        await this.model('Bootcamp').findByIdAndUpdate(bootcampId , {
            averageCost : Math.ceil(obj[0].averageCost/10)*10,
        })
    } catch (error) {
        console.log(error);
    }
}


//post course create average cost should be updated
CourseSchema.post('save', function(){
    this.constructor.getAverageCost(this.bootcamp);
});

//pre course delete average cost of the bootcamp should be updated
CourseSchema.pre('deleteOne', function (){
    console.log('Inside deleteMany');
    //console.log(this.schema.statics);
    this.constructor.getAverageCost(this.bootcamp);
});

module.exports = mongoose.model('Course', CourseSchema);