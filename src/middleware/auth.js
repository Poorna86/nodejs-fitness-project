const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try{
        const token = req.cookies['auth_token']
        const decoded = jwt.verify(token, 'tokenvalue') // ensure token hasn't expired
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token }) // grab user from database
        if (!user) {
			throw new Error()
        }
        
        req.token = token //added for logout
        req.user = user
        next() //user authenticated
    } catch (e) {
        console.log(e)
        res.status(401).send({error: 'Please authenticate..'})
    }
}

module.exports = auth