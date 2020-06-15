const express = require('express')
const Login = require('../models/login')
const router = new express.Router

//inserting input to the database
router.post('/users', async (req,res) =>{

    const login = new Login(req.body)    
    try{
        await login.save() //mongoose middleware functionality 
        res.status(201).send()
    } catch(e) {
        res.status(400).send()  //send invalid status code
    }
})

module.exports = router
