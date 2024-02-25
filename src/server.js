const express = require('express');
const { ServerConfig } = require('./config');
console.log(ServerConfig);
const app = express();

const PORT = ServerConfig.PORT || 5001;

app.listen(PORT , console.log(`Server running in ${ServerConfig.NODE_ENV} mode at ${ServerConfig.PORT}`));