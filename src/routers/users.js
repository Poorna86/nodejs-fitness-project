const path = require('path')
const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router

const app = express()

// Register new user
router.post('/signup', async (req,res) => {  
    
    const user = new User(req.body)  
    
    try{
        await user.save() //mongoose middleware functionality 
        const token = await user.generateAuthToken()
       
        res.cookie('auth_token', token)
        res.status(201).redirect('/succesfulsignup')
    } catch(e) {
        const errorMsg = JSON.stringify(e)
        const errorString = errorMsg.includes('E11000 duplicate key')
        if (errorString){
            res.status(400).redirect('/?' + JSON.stringify('Error: email id already exists'))
        } else if (e.errors.email && e.errors.password) {
			res.status(400).redirect('/?' + JSON.stringify(e.errors.email.message + ' and ' + e.errors.password.message))
		} else if (e.errors.email) {
			res.status(400).redirect('/?' + JSON.stringify(e.errors.email.message))
		} else if (e.errors.password) {
			res.status(400).redirect('/?' + JSON.stringify(e.errors.password.message))
		}
    }
})

router.post('/signin', async (req,res) => {  
        try{
            const user = await User.findByCredentials(req.body.email, req.body.password) 
            console.log('control is here 1')
            const token = await user.generateAuthToken()                    
            res.cookie('auth_token', token)
            res.status(201).redirect('/succesfulsignin')
        } catch(e) {
            res.status(400).redirect('/?' + JSON.stringify('Invalid email or password.'))
        }
})

router.get('/succesfulsignup', auth, async (req,res) => {
    
    try {
        req.user.tokens = []
        await req.user.save()
        res.render('succesfulsignup',{
        title: 'succesfulsignup',
        name: 'Boba'
        })		
	} catch (e) {
		res.status(500).send()
	}
})

// Log in existing user
router.get('/succesfulsignin', auth ,(req,res) => {
    try{
       res.render('succesfulsignin',{
       title: 'succesfulsignin',
       name: 'Boba'
       })
   } catch(e) {
        console.log(e)
    }  
})

// Log out user
router.post('/logout', auth, async (req, res) => {
	try {
		req.user.tokens = []
		await req.user.save()
		await res.redirect('/')
	} catch (e) {
		res.status(500).send()
	}
})

// Get user profile
router.get('/profile', auth, (req, res) => {
	res.send({
		user: req.user
	}) // req.user.email, req.user._id
})

module.exports = router
