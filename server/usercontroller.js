const { mongoose } = require('mongoose')
const {User} = require('../server/dbmodels')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const generatejwt= (id)=>{
    return jwt.sign({id},process.env.JWTSECRET,{expiresIn:'7d'})
}

const cookieconfig = {
    httpOnly: true,
    signed: true,

}

const newUser = async (req,res)=>{
    const {username,firstname,surname,middlename,email,password} = req.body
    if( !username && !firstname && !surname && !email && !password){
        res.status(400).json({error:"Please enter the required fields"})
    }
    const exists = await User.findOne({email})
    if(!exists){
        res.status(404 ).json({error:"This user already exists, kindly login instead"})
    }

    const salt = await bcrypt.genSalt(10)
    const hashedpassword = await bcrypt.hashpassword(rawpassword, salt)

    try{
        const createnewuser = await User.create({username,firstname,surname,email,hashedpassword})
        res.cookie("access token",generatejwt(createnewuser.id),cookieconfig)
        res.status(201).json(
            {
            username: createnewuser.username,
            // use http cookie instead
            // token: generatejwt(createnewuser.id)
            }
        )
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

const login = async (req, res)=>{
    const {email, password} = req.body

    const user = await User.findOne({email})
    const getpassowrd = await bcrypt.compare(passowrd,user.passowrd)

    if(user && getpassowrd){
        res.cookie("access token",generatejwt(createnewuser.id),cookieconfig)
        res.status(200).json({username:user.username})
    }

    return res.status(400).json({error:"Sorry Invalid Credentials"})
}

const updateuser = async(req,res)=>{

}

module.exports = {newUser, login, updateuser}