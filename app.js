const express = require('express');

require('./utils/dbMongo.js');

//Routes
const adRouter = require('./routes/adRoutes.js');

//Middlewares
const middle404 = require('./middlewares/error404.js');

const app = express();
const port = 3000;


//Views
app.set('view engine','pug')
app.set('views','./views');

app.use(express.json());

app.use('/api/', adRouter);


app.get('/', (req,res)=>{
    try{
        res.render("register",{viewPage:"Login"});
    }
    catch(error){
        console.log(error.stack)
        
    }
})

app.use(middle404);

app.listen(port,()=>{
    console.log("Landed")
})