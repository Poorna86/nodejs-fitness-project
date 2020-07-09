const path = require('path')
const express = require('express')
require('./db/mongoose') //loading mongoose
const hbs = require('hbs')
const app = express()
const userRouter = require('./routers/users')

const port = process.env.PORT || 3000

// const loggerMiddleware = (req, res, next) => {
//     console.log('New request to: ' + req.method + ' ' + req.path)
//     next()
//     }
// // Register the function as middleware for the application
//app.use(loggerMiddleware)

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

app.use(express.json()) //receives data from webserver
app.use(userRouter) //call user router



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