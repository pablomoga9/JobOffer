







// **********************************
const express = require('express');
const cookieParser= require('cookie-parser')
const users= require('./controllers/adminControllers')
const usersControllers= require('./controllers/userControllers')
const morgan = require('./config/morganConfig')
const helmet = require('helmet');
const jwt = require('express-jwt');
const cors = require('cors');
const jsonwebtoken= require('jsonwebtoken')

//heroku port
const port = process.env.PORT || 4000;








require('./utils/dbMongo.js');
require('./utils/dbElephant.js')

//Routes
const adRouter = require('./routes/adRoutes.js');
const adminRouter= require('./routes/adminRoutes')
const userRouter = require('./routes/userRoutes.js');
const favsRouter = require('./routes/favsRoutes.js');

//Middlewares
const middle404 = require('./middlewares/error404.js');
const {requireAuth,checkUser} = require('./middlewares/verifiedToken.js');
const res = require('express/lib/response');

const app = express();




//Views
app.set('view engine','pug')
app.set('views','./views');

app.use(helmet());
app.use(express.json());

app.use(morgan(':method :host :status :param[id] - :response-time ms :body'));

app.use(express.urlencoded({extended:true}));
app.use(cors());
// app.use(express.static('public'))
app.use('/api/', adRouter);
app.use('/', adminRouter);
app.use('/api',adminRouter)
app.use('/api',userRouter);
app.use('/api',favsRouter);
app.use(express.static('public'))
app.use(cookieParser())


app.post('api/login', (req, res) => {
      app.use(
          jwt(
          { 
            secret: 'keyDePrueba', 
            algorithms: ['HS256'],
            getToken: req => req.cookies.token
          }));
});


//WEB ROUTES

// app.get('*',checkUser);
//Home(no log, user & admin)

// app.get('/', (req,res)=>{
//     try{
//     //  res.send("Hola desde heroku!")
//     // res.render('homeNoLog');
//     }
//     catch(error){
//         console.log(error.stack)
        
//     }
// })

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
app.use('/',favsRouter)
// app.get('/favourites',(req,res)=>{
//     try{
//         res.render("favourites",{})
//     }
//     catch(error){
//         console.log(error.stack);
//     }
// }) 

// ruta search desde donde se guardan los favoritos
app.use('/',adRouter)
//Dashboard Admin

app.get('/dashboard',(req,res)=>{
    try{
        res.render("dashboardAdmin")
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

app.get('/recoverPassword',(req,res)=>{
    try{
        res.render('recoverPass');
    }
    catch{
        console.log(error)
    }
})





app.use(middle404);



app.listen(port, () => {
    console.log(`Server working in port ${port}`)
})



