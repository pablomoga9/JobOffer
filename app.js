const express = require('express');

require('./utils/dbMongo.js');

//Routes
const adRouter = require('./routes/adRoutes');

//Middlewares
const middle404 = require('./middlewares/error404.js')