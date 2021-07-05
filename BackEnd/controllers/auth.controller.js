const express = require('express');
const userModel = require('./../models/user.model');
const MAP_USER_REQ = require('./../helpers/map_user_requests');
const router = express.Router();
const Uploader = require('./../middlewares/uploader');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const config = require('../configs');

/**
 * Create token with given data
 * @param {object} data 
 * @returns {string}
 */
function createToken(data){
    let token = jwt.sign({
        _id: data.id,
        role: data.role,
        name: data.username 
    },config.JWT_SECRET)
    return token;
}

router.post('/login', function(req,res,next){
    
    userModel
        .findOne({
            username: req.body.username
        })
            .then(function(user){
                if(!user){
                    return next({
                        msg: "invalid username",
                        status: 400
                    })
                }
                if(user.status !== 'active'){
                    return next({
                        msg: 'You account is disabled, pleases contact your system adminstrator for support',
                        status: 401
                    })
                }
                // password verification
                var isMatched = passwordHash.verify(req.body.password, user.password);
                if(isMatched){
                    // Token Generation
                    var token = createToken(user)
                    res.json({
                        user: user,
                        token: token
                    })
                }else{
                    next({
                        msg: "Invalid Password",
                        status: 400
                    })
                }
            }) 
        .catch(function(err){
            next(err)
        })
})


router.post('/register', Uploader.single('image'), function(req,res,next){

    if(req.fileTypeError){
        return next({
            msg: "Invalid file format",
            status: 400
        })
    }
    if(req.file){
        req.body.image = req.file.filename;
    }
    var newUser = new userModel({});
    var newMappedUser = MAP_USER_REQ(newUser, req.body)

    newMappedUser.password = passwordHash.generate(req.body.password);

    newMappedUser.save(function(err,done){
        if(err){
            return next(err);
        }
        
            res.json(done);
        })

})

module.exports = router;