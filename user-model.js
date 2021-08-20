const mongoose = require('mongoose')
const validator = require('validator')



const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if ((!value.includes('@gmail.com') )){//&& (!validator.isEmail(value) ))) {
                throw new Error('Email is not valid... Enter proper EmailId')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password is incorrect')
            }
        }
    },
    phoneNumber : {
        type : String,
        required: true,
    },
    gender: {
        type: String
        
    }
})

module.exports = User