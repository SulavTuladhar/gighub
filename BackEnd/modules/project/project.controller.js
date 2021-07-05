const productModel = require('./project.model');

function insert(req,res,next){

    // parse incoming data
    // Validate data
    // prepare Data
    // Database Operation
    // req,res cycllel compete
}

function find(req,res,next){
    var condition= {}
    productModel
        .find(condition)
        .exec(function(err,done){
            if(err){
                return next(err)
            }
            res.json(product)
        })
}

function findbyId(req,res,next){

}

function update(req,res,next){

}

function remove(req,res,next){

} 

function addToDo(req,res,next){

}

function search(req,res,next){

}

module.exports = {
    insert,
    find,
    findbyId,
    update,
    remove,
    addToDo,
    search
}