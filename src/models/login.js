const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const logSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value){
            if(value.toLowerCase().includes('password') ){
                throw new Error('password should not contain key word "password"')
            }
        }
    },
    Age: {
        type: Number,
        default: 0,
        validate(value){
            if (value < 0){
                throw new Error('Age must be a positive number')
            }
        }
    }
})

logSchema.pre('save', async function (next) {
    const user = this  
         
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next() //call back function
})

const Login = mongoose.model('Login', userSchema)

module.exports = Login  //send User function response to the calling program