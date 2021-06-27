const express = require('express');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const dbName = 'gig'
const conxnURL = 'mongodb://localhost:27017';


const router = express.Router();

router.get('/login', function(req,res,next){
    res.send('from login')
})


router.post('/login', function(req,res,next){
    MongoClient.connect(conxnURL, {useUnifiedTopology: true} ,function(err,client){
        if(err){
            return next(err);
        }

        const db = client.db(dbName);
        db
            .collection('users')
            .find(req.body)
            .toArray(function(err,users){
                if(err){
                    return next(err)
                }
                res.json(users)
            })

    })

})


router.post('/register', function(req,res,next){

    MongoClient.connect(conxnURL, {useUnifiedTopology: true}, function(err,client){ 

        if(err){
            return next(err);
                }

        const selectedDb = client.db(dbName);

        // db operation
        selectedDb
            .collection('users')
            .insertOne(req.body)
                .then(function(response){
                    res.json(response)
                })
                .catch(function(err){
                    next(err)
                })

    })
})

module.exports = router;