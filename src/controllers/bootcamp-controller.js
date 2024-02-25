const { StatusCodes }= require('http-status-codes')


//Access : Public
async function getBootcamps(request,response){
    try{
        //as of now not hitting the service call, just sending the stubbed response
        response.status(StatusCodes.OK).json({success : true , Message : 'List all bootcamps'});
    }catch(error){
        console.log(error);
    }
}

//Access : Public
async function getBootcampsById(request,response){
    try{
        //as of now not hitting the service call, just sending the stubbed response
        response.status(StatusCodes.OK).json({success : true , Message : `Get Bootcamp with Id :${request.params.id}`});
    }catch(error){
        console.log(error);
    }
}


//Access : Public
async function postBootcampsById(request,response){
    try{
        //as of now not hitting the service call, just sending the stubbed response
        response.status(StatusCodes.OK).json({success : true , Message : `Post Bootcamp with Id :${request.params.id}`});
    }catch(error){
        console.log(error);
    }
}

//Access : Public
async function putBootcampsById(request,response){
    try{
        //as of now not hitting the service call, just sending the stubbed response
        response.status(StatusCodes.OK).json({success : true , Message : `Put Bootcamp with Id :${request.params.id}`});
    }catch(error){
        console.log(error);
    }
}

//Access : Public
async function deleteBootcampsById(request,response){
    try{
        //as of now not hitting the service call, just sending the stubbed response
        response.status(StatusCodes.OK).json({success : true , Message : `Delete Bootcamp with Id :${request.params.id}`});
    }catch(error){
        console.log(error);
    }
}

module.exports = {
    getBootcamps,
    getBootcampsById,
    postBootcampsById,
    putBootcampsById,
    deleteBootcampsById,
}