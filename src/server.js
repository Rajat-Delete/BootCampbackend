const express = require('express');
const { ServerConfig,Logger,ConnectDB} = require('./config');
const approutes = require('./routes');

//for connecting the DB
ConnectDB();

const app = express();

//body parser to parse the incoming body parameters
app.use(express.json());
app.use('/api',approutes);

const PORT = ServerConfig.PORT || 5001;

const server = app.listen(PORT ,(request,response)=>{
    console.log(`Server running in ${ServerConfig.NODE_ENV} mode at ${ServerConfig.PORT}`)
    if(ServerConfig.NODE_ENV === 'DEVELOPMENT'){
        Logger.info('Successfully started the Server',{});
    }    
});

//so to handle unhandled rejections, we have added below code for terminating the server
process.on('unhandledRejection',(err,promise)=>{
    console.log(`Err : ${err.message}`);
    server.close(()=> process.exit(1));
})