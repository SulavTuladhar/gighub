const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ToDoSchema = new Schema({

}, {
    timestamps: true
})

module.exports = mongoose.model('ToDo', ToDoSchema);