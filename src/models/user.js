const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
    },
    tokens:[{
        token: {
            type: String,
            required: true
        }
    }]
})

//hash the plain text password before saving the password
userSchema.pre('save', async function (next) {     

    const signup = this
    console.log('signup')            
    if(signup.password !== signup.reppassword) {
        throw new Error('password and reentered password are not same')     
    } else {
        console.log('pswd1')
        signup.password = await bcrypt.hash(signup.password, 8)
        console.log('pswd2')         
        signup.reppassword = await bcrypt.hash(signup.reppassword, 8)
        console.log('after pswds')         
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

//token generation to the indivisual user
userSchema.methods.generateAuthToken = async function() {
    console.log('user: ')
    const user = this
    
    console.log('user: ')
    console.log('user._id: ')
    
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')
    console.log('token: ', token)
    
    user.tokens = user.tokens.concat({token})

    
    //console.log('tokens: ', user.tokens)
    //consol.log('user 1: ', user)
    
    await user.save()
    
    return token
}


const User = mongoose.model('Users', userSchema) //'User' is an mongodb collection name(table name)

module.exports = User  //send User function response to the calling program