const express = require('express');
const cookieParser= require('cookie-parser')
const morgan = require('./config/morganConfig')
const helmet = require('helmet');
const cors = require('cors');
const userController = require('./controllers/userControllers')

require('./utils/dbMongo.js');
require('./utils/dbElephant.js')

//Routes
const adRouter = require('./routes/adRoutes.js');
const adminRouter= require('./routes/adminRoutes')
const userRouter = require('./routes/userRoutes.js');
const favsRouter = require('./routes/favsRoutes.js');

//Middlewares
const verifyToken = require('./middlewares/verifiedToken')
const middle404 = require('./middlewares/error404.js');

const app = express();
const port = 3000;



//Views
app.set('view engine','pug')
app.set('views','./views');

app.use(helmet());
app.use(express.json());
app.use(morgan(':method :host :status :param[id] - :response-time ms :body'));
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use('/api/', adRouter);
app.use('/', adminRouter);
app.use('/api',adminRouter)
app.use('/api',userRouter);
app.use('/api',favsRouter);
app.use(express.static('public'))
app.use(cookieParser())

//WEB ROUTES


//Home(no log, user & admin)

app.get('/', (req,res)=>{
    try{
       let cookies = req.headers.cookie
       const check = userController.checkUser(cookies);

        if(!cookies){
            res.render('homeNoLog');
         }
        else if(cookies && check == "admin"){
            res.render('homeAdmin');
        }
        else if(cookies){
            res.render('homeNoLog');
        }
        
    }
    catch(error){
        console.log(error.stack)
        
    }
})

//Login

app.get('/login',(req,res)=>{
    try{
        res.render("login",{});
    }
    catch(error){
        console.log(error.stack);
    }
})

//Register

app.get('/signup', (req,res)=>{
    try{
        res.render("register",{});
    }
    catch(error){
        console.log(error.stack);
    }
})

//Favourites

app.get('/favourites',(req,res)=>{
    try{
        let cookies = req.headers.cookie
       const check = userController.checkUser(cookies);
        if(!cookies){
            res.redirect('/')
        }
        else if(cookies && check == "admin"){
          res.redirect('/')
        }
        else if(cookies){
            res.render('favourites');
        }
        }
      
    catch(error){
        console.log(error.stack);
    }
}) 
//Dashboard Admin

app.get('/dashboard',(req,res)=>{
    try{
        let cookies = req.headers.cookie
        const check = userController.checkUser(cookies);
        // console.log(check);
         if(!cookies){
             res.redirect('/')
         }
         else if(cookies && userController.checkUser(cookies)==true){
          res.render('dashboardAdmin');
         }
         else if(cookies){
            res.redirect('/')
         }
    }
    catch(error){
        console.log(error.stack);
    }
})


//Profile

app.get('/profile',(req,res)=>{
    try{
        //Comprobar de qué tipo es el usuario logueado y hacer un rend u otro
        if(userType==0){
            res.render("profileUser",{});
        }
        else if(userType==1){
            res.render("profileAdmin",{});
        }
       }
    catch(error){
        console.log(error.stack);
    }
})

app.get('api/users'),(req,res)=>{
    try{
        let cookies = req.headers.cookie
        const check = userController.checkUser(cookies);
       
         if(!cookies){
             res.redirect('/')
         }
         else if(cookies && userController.checkUser(cookies)==true){
          res.render('usersAdmin');
         }
         else if(cookies){
            res.redirect('/')
         }
    }
    catch(error){

    }
}

app.get('/recoverPassword',(req,res)=>{
    try{
        res.render('recoverPass');
    }
    catch{
        console.log(error)
    }
})




// app.use(verifyToken);
app.use(middle404);



app.listen(port, () => {
    console.log(`Server working in port ${port}`)
})



