// ======================= SERVER ======================= 
const path = require('path') // Needed to get views path inside 'src' folder
const express = require('express') // Initialize the express server
require('./db/mongoose') // Require mongoose file to ensure file runs and mongoose connects to database
const hbs  = require('hbs') // Register a Handlebars view engine
const cookieParser = require('cookie-parser') // Use cookies to store the JSON web tokens on the frontend
const bodyParser = require('body-parser'); 
const methodOverride = require('method-override') // Allows HTML forms to process PATCH/DELETE requests
const User = require('../src/models/user') // Load user model module into the app
const userRouter = require('./routers/users') //Load user router module into the app
const jwt = require('jsonwebtoken')

const app = express()
const port = process.env.PORT || 3000

// ======== Middleware ========
app.use(express.json()) //receives data from webserver
app.use(express.urlencoded({ extended: false })) // Parses data sent via forms from the frontend
app.use(cookieParser()) // Parses cookies sent with the forms from the frontend
app.use(methodOverride('_method')) // Allows HTML forms to process PATCH/DELETE requests

//define paths for express config
const htmlLibPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const templatePartials = path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(templatePartials)

//setup static directory to serve
app.use(express.static(htmlLibPath))
app.use(express.static('public'))
app.use(express.json()) //receives data from webserver
//app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ extended: true })) // initialize body-parser to parse incoming parameters requests to req.body
app.use(userRouter) //call user router

app.use((req,res,next) => {
    console.log('req.method = ', req.method)
    next()
    //res.status(503).send('site is under development, will be available ASAP')
})

// route for Home-Page
app.get('',(req,res) => {
    res.render('index',{
        title: 'fitness Application',
        name: 'Boba'
    })
})

app.get('/bodycheck',(req,res) => {
    res.render('bodycheck',{
        title: 'Body checks',
        name: 'Boba'
    })
})

app.get('/contactus',(req,res) => {
    res.render('contactus',{
        title: 'Contact info',
        name: 'Boba'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About me',
        name: 'Poorna'
    })
})

app.listen(port,() => {
    console.log('server is up on port ' +port)
})