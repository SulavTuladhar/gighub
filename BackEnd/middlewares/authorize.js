module.exports = function(req,res,next){
    if(req.user.role != 1){
        return next({
            msg: 'You don\'t have permission',
            status: 403
        })
    }
    next();
}