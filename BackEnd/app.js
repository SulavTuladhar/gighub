const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express(); // Entire express framework is available in app
const PORT = 8080

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

//Loading Routin level middleware
app.use('/auth', AuthRouter);


//Error handeling middlware
app.use(function(err,req,res,next){
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