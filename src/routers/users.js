const path = require('path')
const express = require('express')
const User = require('../models/user')
const router = new express.Router
const auth = require('../middleware/auth')

//inserting input to the database
router.post('/signup', async (req,res) => {  
    
    const user = new User(req.body)  
    console.log('users: ', user)
    try{
        await user.save() //mongoose middleware functionality 
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch(e) {
        res.status(400).send(e)  //send invalid status code
    }
})

router.post('/signin',auth, async (req,res) => {  
        try{
            const user = await User.findByCredentials(req.body.email, req.body.password) 
            const token = await user.generateAuthToken()
            res.status(200).send(user)
        } catch(e) {
            res.status(400).send()  //send invalid status code
        }
})


module.exports = router
