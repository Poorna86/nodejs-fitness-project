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
}, {
    timestamps: true    
})

//hash the plain text password before saving the password
userSchema.pre('save', async function (next) {     
    const signup = this

    if(signup.isModified('password')) {
                
        if(signup.password !== signup.reppassword) {
            throw new Error('password and reentered password are not same')     
        } else {
            signup.password = await bcrypt.hash(signup.password, 8)
            signup.reppassword = await bcrypt.hash(signup.reppassword, 8)
        }
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

userSchema.methods.toJSON = function() {
    const user = this
    try{
        const userObject = user.toObject() //JSON.stringfy metoh called internally
        delete userObject.password
        delete userObject.tokens
        delete userObject.reppassword
        return userObject
    } catch(e) {
        console.log(e)
    }
    
}

userSchema.methods.generateAuthToken = async function() { // no arrow function because of use of 'this'
    try {
        const user = this
        const token = jwt.sign({ _id: user._id.toString() }, 'tokenvalue')
        user.tokens = user.tokens.concat({token})
        await user.save()
        return token
    }   catch(e) {
        console.log(e)
    } 
}

const User = mongoose.model('Users', userSchema) //'User' is an mongodb collection name(table name)

module.exports = User  //send User function response to the calling program