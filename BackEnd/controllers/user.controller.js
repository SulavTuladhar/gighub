const router = require('express').Router();
const userModel = require('./../models/user.model');
const MAP_USER_REQ = require('./../helpers/map_user_requests');
const Uploader = require('./../middlewares/uploader');
const fs = require('fs')
const path =require('path');

router.route('/')
    .get(function(req,res,next){
        userModel
            .find({})
            .sort({
                _id: -1
            })
                .exec(function(err,users){
                    if(err){
                        return next(err);
                    }
                    res.json(users);
                })
    });
 
router.route('/:id')
    .get(function(req,res,next){
        const id = req.params.id; 
        // userModel
        //     .findOne({
        //         _id:id
        //     })
        //         .then(function(user){
        //             if(!user){
        //                 return next({
        //                     msg: 'User not found',
        //                     status: 404
        //                 })
        //             }
        //             res.json(user)
        //         })
        //         .catch(function(err){
        //             next(err)
        //         })

        userModel.findById(id, function(err,user){
            if(err){
                return next(err)
            }
            if(!user){
                return next({
                    msg: 'User not found',
                    status: 404
                })
            }
            res.json(user)
        })
    })

    .put(Uploader.single('image'), function(req,res,next){
        if(req.fileTypeError){
            return next({
                msg: "Invalid file format",
                status: 400
            })
        }
        const data = req.body;
        if(req.file){
            data.image = req.file.filename;
        }
        
        userModel.findById(req.params.id, function(err,user){
            if(err){
                return next(err)
            }
            if(!user){
                return next({
                    msg: 'User not found',
                    status: 404
                })
            }
            var oldImage = user.image;

            var mappedUpdatedUser = MAP_USER_REQ(user, data);

            // if user exists not let's update
            mappedUpdatedUser.save(function(err,updated){
                if(err){
                    return next(err)
                }
                if(req.file){
                    fs.unlink(path.join(process.cwd(),'uploads/images/' + oldImage), function(err,done){
                        if(err){
                            console.log('error in removing', err)
                        }else{
                            console.log("sucess in removing")
                        }
                    })
                }
                res.json(updated)
            })
        
            });

    })

    .delete(function(req,res,next){
        userModel.findById(req.params.id, function(err,user){
            if(err){
                return next(err)
            }
            if(!user){
                return next({
                    msg: "user not found",
                    status: 404
                })
            }
            user.remove(function(err,removed){
                if(err){
                    return next(err)
                }
                res.json(removed)
            })
        })
    });
    
module.exports = router;