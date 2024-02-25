const express = require('express');
const { ServerConfig,Logger } = require('./config');
const approutes = require('./routes');

const app = express();
app.use('/api',approutes);

const PORT = ServerConfig.PORT || 5001;

app.listen(PORT ,(request,response)=>{
    console.log(`Server running in ${ServerConfig.NODE_ENV} mode at ${ServerConfig.PORT}`)
    if(ServerConfig.NODE_ENV === 'DEVELOPMENT'){
        Logger.info('Successfully started the Server',{});
    }
    
});