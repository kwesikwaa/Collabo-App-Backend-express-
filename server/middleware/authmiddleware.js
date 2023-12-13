const {User} = require('../models/dbmodels')
const jwt = require('jsonwebtoken')


const authenticateuser = async(req, res, next)=>{
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            console.log(req.headers.authorization)
            token = req.headers.authorization.split(' ')[1]
            const decodejwt = jwt.verify(token, process.env.JWTSECRET)

            req.user = await User.findById(decodejwt.id).select('id')
            console.log(req.user)
            next()
        }catch(error){
            res.status(401)
            throw new Error('You are unauthenticated')
        }
    }
    if(!token){
        res.status(401)
        throw new Error('You are unauthenticated')
    }
} 

module.exports = authenticateuser