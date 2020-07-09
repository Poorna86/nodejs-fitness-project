const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
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
        contact: true,
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

//hash the plain text password before saving the password
userSchema.pre('save', async function (next) {     

    const signup = this            
    if(signup.password !== signup.reppassword) {
        throw new Error('password and reentered password are not same')     
    } else {
        console.log('pswd check: ', signup.password + ' ' + ' ', signup.reppassword)
        signup.password = await bcrypt.hash(signup.password, 8)         
        signup.reppassword = await bcrypt.hash(signup.reppassword, 8)         
    }     
    next()
})

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email }) // select the collection which satisfies 
    
    if (!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user
}

const User = mongoose.model('Users', userSchema) //'User' is an mongodb collection name(table name)

module.exports = User  //send User function response to the calling program