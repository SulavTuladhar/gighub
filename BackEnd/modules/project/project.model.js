const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const ToDoSchema = new Schema({
    name: String,
    updated_by: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    status: {
        type: String,
        enum: ['on track', 'At risk', 'off track']
    },
    Priority:{
        type: String,
        enum: ['high', 'medium', 'low']
    },
    tags:{
        type: String,
        enum: ['Doing', 'Done', 'To Do']
    },
    dueDate: Date
}, {
    timestamps: true
})

const ProjectSchema = new Schema({
    name: String,
    description: String,
    role: {
        type: String,
        enum:  ['head','member']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    files: [String], //Array of string
    todos: [ToDoSchema], //Array of object
    status: {
        type: String,
        enum:['on going', 'Completed']
    },
    dueDate: Date
},{
    timestamps: true
});

module.exports = mongoose.model('project', ProjectSchema)