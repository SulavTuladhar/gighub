const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // db Modeling
    name: String,
    email:{
        type: String,
        unique: true
    },
    username: {
        type: String,
        lowercase: true,
        trim: true,
        require: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    dob: {
        type: Date,
    },
    phoneNumber: {
        type: Number
    },
    address:{
        tempAddress: [String],
        permanentAddress: String
    },
    country: {
        type: String,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'others']
    },
    status: {
        type: String,
        enum: ['active', 'inActive', 'NotConfirmend'],
        default: "active"
    },
    role: {
        type: Number, // 1 for admin, 2 for norma user
        default: 2
    },
    image: String,
    


},{
    timestamps: true
})

module.exports = mongoose.model('user', userSchema);