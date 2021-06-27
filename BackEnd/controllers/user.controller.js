const router = require('express').Router();
const dbConfig = require('./../configs/db.config');

function connection(cb){
    dbConfig.MongoClient.connect(dbConfig.conxnURL,
        {useUnifiedTopolology:true},
        function(err,client){

            if(err){
                cb(err);
            }else{
                const db = client.db(dbConfig.dbName);
                cb(null, db);
            }
        }

        )
}

router.route('/')
    .get(function(req,res,next){
        connection(function(err,db){
            if(err){
                return next(err);
            }
            db.collection('users')
                .find({})
                .toArray(function(err,users){
                    if(err){
                        return next(err);
                    }
                    res.json(users);
                })
        })
    });
    // .post(function(req,res,next){

    // });
 
router.route('/:id')
    .get(function(req,res,next){
        const id = req.params.id; 
        connection(function(err,db){
            if(err){
                return next(err); 
            }
            db
                .collection('users')
                .find({_id: new dbConfig.OID(id)})
                .toArray(function(err,user){
                    if(err){
                        return next(err)
                    }
                    if(!user[0]){
                        return next({
                            msg: 'User not found',
                            status: 404
                        })
                    }
                    res.json(user[0])
                })
        })
    })

    .put(function(req,res,next){
        connection(function(err,db){
            if(err){
                return next(err);
            }
            db
                .collection('users')
                .update(
                    {_id: new dbConfig.OID(req.params.id)},
                    {$set: req.body}
                )
                    .then(function(data){
                        res.json(data)
                    })
                    .catch(function(err){
                        next(err)
                    })
        })
    })

    .delete(function(req,res,next){
        connection(function(err,db){
            if(err){
                return next(err);
            }
            db
                .collection('users')
                .remove({
                    _id: new dbConfig.OID(req.params.id)
                },
                    function(err,removed){
                        if(err){
                            return next(err);
                        }
                        res.json(removed)
                    })
        })
    });
    
module.exports = router;