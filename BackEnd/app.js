const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express(); // Entire express framework is available in app
const PORT = 8080;


// Application level middleware
const authenticate = require('./middlewares/authenticate')
const authorize = require('./middlewares/authorize');
// Runinng as a part of this program
require('./db_init');

//Loading ThirdParty Middleware
app.use(morgan('dev'))

// Loading inBuilt Middleware
app.use(express.static('upload'));
app.use(express.urlencoded({        //Parser of x-ww-form-urlencoded
    extended: true
}))
app.use(express.json());            // Parse for Json

//import Routin level middleware
const AuthRouter = require('./controllers/auth.controller');
const UserRouter = require('./controllers/user.controller');
const projectRouter = require('./modules/project/project.route');

//Loading Routin level middleware
app.use('/auth', AuthRouter);
app.use('/user', authenticate, authorize, UserRouter);
app.use('/project', projectRouter)


//Error handeling middlware
app.use(function(err,req,res,next){
    console.log("error is >>", err)
    res.json({
        msg: err.msg || err,
        status: err.status || 400
    })
}) 

// Server listener 
app.listen(PORT, function(err,done){
    if(err){
        console.log('Server listening failed', err)
    }else{
        console.log("Server listening at port " + PORT )
    }
})