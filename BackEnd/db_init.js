// Db connection setup
const dbConfig = require('./configs/db.config');
const mongoose = require('mongoose');

// Monogodb://loaclhost:/28017/db_name
mongoose.connect(dbConfig.conxnURL + '/' + dbConfig.dbName, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, function(err,done){
    if(err){
        console.log("Database connection failed.");
    }else{
        console.log("Database connection open")
    }
});