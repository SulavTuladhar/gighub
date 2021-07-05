const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./../configs');
const config = require('./../configs');
const userModel = require('./../models/user.model')

module.exports = function(req, res, next){
    let token;
    if (req.headers['authorization'])
        token = req.headers['authorization']
    if (req.headers['x-access-token'])
        token = req.headers['x-access-token']
    if (req.query['token'])  
        token = req.query['token']
    if(!token)
        next({
            msg: 'Authentication failed. Token not Provided',
            status: 401
        })
    // Token exist, now validate
    jwt.verify(token, JWT_SECRET, function(err,decoded){
        if(err){
            return next(err)
        }
        console.log('Token Verification sucessfull>>', decoded);
        req.user = decoded;
        // This is middleware so request be proceed further
        userModel.findById(decoded._id,function(err,user){
            if(err){
                return next(err)
            }
            if(!user){
                return next({
                    msg: 'User removed from system',
                    status: 400
                })
            }
            req.user = user;
            next();
        })
    })
}