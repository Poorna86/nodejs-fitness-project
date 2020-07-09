const express = require('express')
const User = require('../models/user')
const router = new express.Router
const bodyParser = require('body-parser')

const urlencodedParser = bodyParser.urlencoded({ extended: false })
//inserting input to the database
router.post('/signup', urlencodedParser, async (req,res) => {  
    const user = new User(req.body)  
     
    try{
       await user.save() //mongoose middleware functionality 
       res.status(200).send()
    } catch(e) {
        res.status(400).send(e)  //send invalid status code
    }
})

router.post('/signin', urlencodedParser, async (req,res) => {  
        try{
            const user = await User.findByCredentials(req.body.email, req.body.password) 
            res.status(200).send(user)
        } catch(e) {
            res.status(400).send()  //send invalid status code
        }
})


module.exports = router
