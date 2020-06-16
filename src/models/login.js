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
    contact:{
        type: Number,
        required: true,
        maxlength: 10,
        trim: true
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
    reppassword: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value){
            if(value.toLowerCase().includes('password') ){
                throw new Error('password should not contain key word "password"')
            }
        }
    }
})

logSchema.pre('save', async function (next) {
    const user = this  

    if(user.password !== user.reppassword) {
        throw new Error('password and re-entered password are not same')
    }
    user.password = await bcrypt.hash(user.password, 8)
    user.reppassword = await bcrypt.hash(user.reppassword, 8)

    next() //call back function
})

const Login = mongoose.model('Login', logSchema)

module.exports = Login  //send User function response to the calling program