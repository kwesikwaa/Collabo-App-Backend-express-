const {User} = require('../models/dbmodels')
const jwt = require('jsonwebtoken')


const authenticateuser = async(req, res, next)=>{
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1]
            const decodejwt = jwt.verify(token, process.env.JWTSECRET)

            req.user = await User.findById(decodejwt.id).select('id')
            next()
        }catch(error){
            res.status(401)
            throw new Error('Unauthorized')
        }
    }
    if(!token){
        res.status(401)
        throw new Error('Unauthorized')
    }
}

module.exports = {authenticateuser}