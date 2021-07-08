const projectModel = require('./project.model');

function map_project_req(project, projectData){
    if(projectData.name)
        project.name = projectData.name;
    if(projectData.description)
        project.description = projectData.description;
    if(projectData.role)
        project.role = projectData.role;
    if(projectData.status)
        project.status = projectData.status;
    if(projectData.files)
        project.files = projectData.files;
    if(projectData.user)
        project.user = projectData.user;
    if(projectData.flag)
        project.flag = projectData.flag;
    if(projectData.dueDate)
        project.dueDate = projectData.dueDate;
        
}

function insert(req,res,next){

    // parse incoming data
    // Validate data
    // Database Operation
    // req,res cycllel compete
    const data = req.body;
    console.log("req ko body >>" ,data)
    // prepare Data
    data.user = req.user._id;
    const newProject = new projectModel({});
    // newProject is mongooose obj
    map_project_req(newProject, data)
    newProject.save()
        .then(function(saved){
            res.json(saved);
        })
        .catch(function(err){
            next(err);
        })


}

function find(req,res,next){
    var condition= {}
    projectModel
        .find(condition)
        .sort({
            _id: -1
        })
        //sort, limit. skip
        .populate('user',{
            username: 1
        })
        .exec(function(err,project){
            if(err){
                return next(err)
            }
            res.json(project)
        })
}

function findById(req,res,next){
    projectModel
        .findById(req.params.id, function(err,project){
            if(err){
                return next(err);
            }
            if(!project){
                return next({
                    msg: "Project Not found",
                    status: 404
                })
            }
            res.json(project)
        })
        .populate('user', {
            username:1
        }) 
}

function update(req,res,next){
    projectModel.findById(req.params.id, function(err,project){
        if(err){
            return next(err)
        }
        if(!project){
            return next({
                msg: 'Project Not Found',
                status: 404
            })
        }
        // Project Found
        const data = req.body;
        // Data Prepration
        map_project_req(project, data);
        project.save(function(err,updated){
            if(err){
                return next(err);
            }
            res.json(updated)
        })

    })

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
    findById,
    update,
    remove,
    addToDo,
    search
}