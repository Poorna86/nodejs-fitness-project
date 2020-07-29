const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/fitness-api',{
//mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
   // useUnifiedTopology: true,
    useFindAndModify: false
})