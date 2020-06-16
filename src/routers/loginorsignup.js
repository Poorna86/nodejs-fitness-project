const express = require('express')
const Login = require('../models/login')
const router = new express.Router

const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })

//inserting input to the database
router.post('/signup',urlencodedParser, async (req,res) => {
    
     const login = new Login(req.body)  
     console.log('login: ', login)
     try{
         await login.save() //mongoose middleware functionality 
         res.status(200).send(res.body)
     } catch(e) {
         res.status(400).send(e)  //send invalid status code
     }
})

module.exports = router
