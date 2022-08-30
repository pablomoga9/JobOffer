const express = require('express');

require('./utils/dbMongo.js');

//Routes
const adRouter = require('./routes/adRoutes');

//Middlewares
const middle404 = require('./middlewares/error404.js');

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api/', adRouter);

app.use(middle404);

app.listen(port,()=>{
    console.log("Landed")
})